import supabase from "@/supabase/supabase";
import formidable, { Fields, Files } from "formidable";
import sharp from "sharp";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

/**
 * The endpoint is responsible for handling a POST request to add a new post, 
 * including an image and caption, to a Supabase database.
 * 
 * Endpoint Information
 * Method: POST
 * Path: /api/add_post
 * 
 * Request Body Parameters
 * The request body should be sent as a multipart form data. The following parameters are expected:
 * user_id (string): The ID of the user creating the post.
 * image (file): The image file to be uploaded.
 * caption (string): The caption or description for the post.
 * 
 * Response
 * The endpoint provides JSON responses for different scenarios:
 * Success (HTTP 200): The post was created successfully. The response will contain the inserted post data.
 * Method Not Allowed (HTTP 405): The request used an unsupported HTTP method.
 * Form Parsing Error (HTTP 500): An error occurred while parsing the form data.
 * Image Processing Error (HTTP 500): An error occurred while processing the image file.
 * Upload Error (HTTP 500): An error occurred while uploading the photo to the cloud storage.
 * Post Upload Error (HTTP 500): An error occurred while uploading the post data to the Supabase database.
 */

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req, res
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  console.log("Inside ADD_POST API endpoint");
  const form = new formidable.IncomingForm({
    maxFileSize: 50 * 1024 * 1024, // 50 MB
    maxFieldsSize: 50 * 1024 * 1024, // 50 MB
  });

  let formData = {
    user_id: null,
    image: null,
    caption: null,
  };

  form.on("field", (name, value) => {
    if (name === "user_id" || name === "caption") {
      formData[name] = value;
    }
  });

  form.on("file", (name, file) => {
    if (name === "image") {
      formData[name] = file;
    }
  });

  form.on("end", () => {
    console.log("Form data fully received:", formData);
    // res.status(200).json({ message: 'Upload successful.' });
  });

  form.on("error", (err) => {
    console.error("Form parsing error:", err);
    res.status(500).json({ error: "Form parsing error." });
  });

  form.parse(req, async (err, fields, files) => {
    console.log("Parsing Form Data");
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Unable to process the image" });
      return;
    }
    const user_id = fields.user_id;
    const imageFile = files.image;
    const caption = fields.caption;

    const buffer = await fs.promises.readFile(imageFile.filepath);
    const convertedImageBuffer = await sharp(buffer).jpeg().toBuffer();

    let cloudStorageFilePath = user_id + "/" + uuidv4() + ".jpg";
    cloudStorageFilePath = cloudStorageFilePath.replace("|", "-");
    console.log("CloudStorageFilePath", cloudStorageFilePath);

    const { data, error } = await supabase.storage
      .from("user_posts")
      .upload(cloudStorageFilePath, convertedImageBuffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: "image/jpeg"
      });

    if (error) {
      console.log("Error in Uploading Photo");
      console.log(error);
      res.status(500);
    } else {
      console.log("Photo Uploaded Successfully");
      const { data, error } = await supabase
        .from("Posts")
        .insert([
          {
            image_url: cloudStorageFilePath,
            caption: caption,
            user_id: user_id,
            post_id: cloudStorageFilePath,
          },
        ])
        .select();
      if (error) {
        console.log("Error in Uploading Post");
        console.log(error);
        res.status(500);
      } else {
        console.log("Post Created Successfully");
        console.log(data);
        res.status(200).json(data);
        return;
      }
    }
  });
}

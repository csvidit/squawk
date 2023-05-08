import supabase from "@/supabase/supabase";
import formidable, { Fields, Files } from "formidable";
import sharp from "sharp";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

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
    maxFileSize: 10 * 1024 * 1024, // 10 MB
    maxFieldsSize: 10 * 1024 * 1024, // 10 MB
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

import supabase from "@/supabase/supabase";
import formidable, { Fields, Files } from "formidable";
import sharp from "sharp";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

interface FormData {
  user_id: string | null;
  image: File | null;
  caption: string | null;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
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

  let formData: FormData = {
    user_id: null,
    image: null,
    caption: null,
  };

  form.on("field", (name: string, value: string) => {
    if (name === "user_id" || name === "caption") {
      formData[name] = value;
    }
  });

  form.on("file", (name: string, file: any) => {
    if (name === "image") {
      formData[name] = file;
    }
  });

  form.on("end", () => {
    console.log("Form data fully received:", formData);
    // res.status(200).json({ message: 'Upload successful.' });
  });

  form.on("error", (err: Error) => {
    console.error("Form parsing error:", err);
    res.status(500).json({ error: "Form parsing error." });
  });
  
  form.parse(req, async (err: any, fields: Fields, files: Files) => {
    console.log("Parsing Form Data");
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Unable to process the image" });
      return;
    }
    const user_id = fields.user_id;
    const imageFile = files.image as formidable.File;
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
          },
        ])
        .select();
      if (error) {
        console.log("Error in Uploading Post");
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

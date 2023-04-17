import supabase from "@/supabase/supabase";
import formidable, { Fields, Files } from "formidable";
import sharp from "sharp";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  console.log("Inside ADD_POST API endpoint");
  const form = new formidable.IncomingForm();

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

    const cloudStorageFilePath = user_id + "/" + uuidv4() + ".jpg";

    const { data, error } = await supabase.storage
      .from("user_posts")
      .upload(cloudStorageFilePath, convertedImageBuffer, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      res.status(500);
    } else {
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
        res.status(500);
      } else {
        console.log(data);
        res.status(200).json(data);
        return;
      }
    }
  });
}

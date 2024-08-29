import fs from "node:fs";
import path from "node:path";

import { randomUUID } from "node:crypto";

export async function uploadImageToStorage(imageBuffer: Buffer): Promise<string> {
  const imageName = `${randomUUID()}.jpg`;
  const imagePath = path.join(__dirname, '../tmp', imageName);

  try {
    await fs.promises.writeFile(imagePath, imageBuffer);
    return `http://localhost:3333/uploads/${imageName}`; // Use a consistent path prefix
  } catch (error) {
    console.error("Error saving image:", error);
    throw new Error("Error saving image.");
  }
}
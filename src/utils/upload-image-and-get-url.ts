import { GetObjectCommand, PutObjectCommand} from "@aws-sdk/client-s3";

import { s3Client } from "@/lib/s3";
import { env } from "@/env";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


export async function uploadImageAndGetUrl(
  imageBuffer: Buffer,
  objectKey: string,
  fileType: string,
) {
  const command = new PutObjectCommand({
    Bucket: env.AWS_BUCKET_NAME,
    Key: objectKey,
    Body: imageBuffer,
    ContentType: fileType,
    ACL: "public-read",
  })

  s3Client.send(command)
  
  const publicUrl = `https://pub-9137fa53f15f47338ba8b3dc1174acf6.r2.dev/${objectKey}`
  
  const getObjectCommand = new GetObjectCommand({
    Bucket: env.AWS_BUCKET_NAME,
    Key: objectKey
  });

  const temporaryLink = await getSignedUrl(s3Client, getObjectCommand, {
    expiresIn: 600 // 10 minutes
  })


  return {
    temporaryLink,
    publicUrl,
  }
}
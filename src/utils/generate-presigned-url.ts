import { env } from "@/env";
import { s3Client } from "@/lib/s3";
import { GetObjectAclCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * 
 * @param fileName 
 * @param expiration 
 * @returns presignedUrl: string
 */
export async function generatePresignedUrl(
  fileName: string,
  expiration: number = 60
): Promise<{ temporaryLink: string}> {
  const command = new PutObjectCommand({
    Bucket: env.AWS_BUCKET_NAME,
    Key: fileName,
  })

  const temporaryLink = await getSignedUrl(s3Client, command, {
    expiresIn: expiration
  })

  return {
    temporaryLink
  }
}
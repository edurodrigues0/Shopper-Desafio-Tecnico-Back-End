import { env } from "@/env";
import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  region: 'auto',
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_KEY_ID,
  }
})
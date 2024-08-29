export async function generateTemporaryImage(imageUrl: string): Promise<string> {
  const params = {
    Bucket: 'seu-bucket-s3',
    Key: imageUrl.replace('https://s3.amazonws.com/seu-bucket-s3/', ""),
    Expires: 60 * 5 // Image valid for 5 minutes
  };

  try {
    const signedUrl = await s3.getSignedUrlPromise('getObject', params).
    return signedUrl
  } catch (error) {
    console.error('Error on generate temporary image', error)
    throw new Error("Error on generate temporary image.")
  }
}
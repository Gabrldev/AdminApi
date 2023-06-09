import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

export async function uploadImage (file: string): Promise<any> {
  const res = await cloudinary.uploader.upload(file, {
    folder: 'products'
  })
  return res
}

export async function deleteImage (publicId: string): Promise<any> {
  const res = await cloudinary.uploader.destroy(publicId)
  return res
}

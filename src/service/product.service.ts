import { Product, IProduct } from '../models/products'
import { uploadImage, deleteImage } from '../utils/cloudinary'
import fs from 'fs-extra'

export async function getProduct (): Promise<IProduct[]> {
  return await Product.find()
}

export async function createProduct (
  body: IProduct,
  image: string
): Promise<IProduct> {
  const upload = await uploadImage(image)
  const product = await Product.create({
    ...body,
    image: upload.secure_url,
    imageId: upload.public_id
  })
  await fs.unlink(image)
  return product
}

export async function deleteProduct (id: string): Promise<IProduct | null> {
  const product = await Product.findByIdAndDelete(id)
  const { imageId } = product as IProduct
  await deleteImage(imageId)

  return product
}

export async function updateProduct (
  id: any,
  data: any,
  image: any
): Promise<IProduct | null> {
  try {
    if (image !== undefined) {
      const product = await Product.findById(id)
      const { imageId } = product as IProduct
      await deleteImage(imageId)
      const upload = await uploadImage(image)
      const productUpdate = await Product.findByIdAndUpdate(
        id,
        { ...data, image: upload.secure_url, imageId: upload.public_id },
        { new: true }
      )
      await fs.unlink(image)
      return productUpdate
    } else {
      const productUpdate = await Product.findByIdAndUpdate(
        id,
        { ...data },
        { new: true }
      )
      return productUpdate
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

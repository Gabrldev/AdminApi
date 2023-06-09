import { Request, Response } from 'express'
import {
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct
} from '../service/product.service'

export const productController = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  try {
    const products = await getProduct()
    res.status(200).json(products)
  } catch (error) {}
}

export const createController = async (
  req: Request,
  res: Response | any
): Promise<void> => {
  try {
    // verifica si hay un archivo
    if (req.file == null) {
      return res.status(400).json({ message: 'Image is required' })
    }
    // verifica si el archivo es una imagen
    if (!req.file.mimetype.startsWith('image')) {
      return res.status(400).json({ message: 'File must be an image' })
    }
    // crea el producto
    const product = await createProduct(req.body, req.file.path)
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}
export const deleteController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params
    const product = await deleteProduct(id)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateController = async (
  req: Request,
  res: Response | any
): Promise<void> => {
  const image = req.file?.path
  try {
    const { id } = req.params
    const data = req.body
    const product = await updateProduct(id, data, image)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

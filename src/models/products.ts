import mongoose from 'mongoose'

export interface IProduct {
  id: string
  name: string
  description: string
  price: number
  stock: number
  image: string
  imageId: string
  createdAt?: Date
  updatedAt?: Date
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required']
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  imageId: {
    type: String,
    required: [true, 'ImageId is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
}, {
  versionKey: false
})

export const Product = mongoose.model<IProduct>('Product', productSchema)

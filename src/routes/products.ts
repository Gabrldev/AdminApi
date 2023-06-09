/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import {
  productController,
  createController,
  deleteController,
  updateController
} from '../controllers/products'
import { uploadFile } from '../utils/upload'

const router = Router()

router.get('/', productController)
router.post('/', uploadFile, createController)
router.delete('/:id', deleteController)
router.put('/:id', uploadFile, updateController)

export { router }

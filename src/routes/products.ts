/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import {
  productController,
  createController,
  deleteController,
  updateController
} from '../controllers/products'
import { uploadFile } from '../utils/upload'
import { protectedRoute } from '../middleware/session'

const router = Router()

router.get('/', protectedRoute, productController)
router.post('/', protectedRoute, uploadFile, createController)
router.delete('/:id', protectedRoute, deleteController)
router.put('/:id', protectedRoute, uploadFile, updateController)

export { router }

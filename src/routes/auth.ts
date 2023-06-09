/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { registerController, loginController } from '../controllers/auth'
import { validate } from '../middleware/validator'
import { registerSchema, loginSchema } from '../schemas/auth'

const router = Router()

router.post('/register', validate(registerSchema), registerController)
router.post('/login', validate(loginSchema), loginController)

export { router }

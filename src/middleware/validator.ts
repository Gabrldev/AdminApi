import { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod/lib'

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body)
    next()
  } catch (error: any) {
    return res.status(400).json({ message: error.errors[0] })
  }
}

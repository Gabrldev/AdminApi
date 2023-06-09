import { Request, Response } from 'express'
import multer from 'multer'

export const uploadFile = (req: Request, res: Response, next: any): void => {
  const upload = multer({
    storage: multer.diskStorage({ destination: 'uploads/' }),
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/webp'
      ) {
        cb(null, true)
      } else {
        cb(null, false)
        res.status(400).json({ message: 'Only .png, .jpg, .jpeg and .webp format allowed!' })
        return cb(new Error('Only .png, .jpg, .jpeg and .webp format allowed!'))
      }
    }
  })
  upload.single('imageProduct')(req, res, next)
}

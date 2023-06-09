import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../utils/jwt'

export const protectedRoute = (req: Request | any, res: Response, next: NextFunction): any => {
  const token = req.cookies.token
  if (token === null) {
    return res.status(401).json({ message: 'Unauthorized' })
  } else if (token !== null) {
    try {
      const decode = verifyToken(token)
      req.user = decode
      next()
    } catch (error: any) {
      return res.status(400).json({ message: 'Invalid token' })
    }
  }
}

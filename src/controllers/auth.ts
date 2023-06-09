import { Request, Response } from 'express'
import { registerUser, loginUser } from '../service/auth.service'
import { generateToken } from '../utils/jwt'

export const registerController = async (
  req: Request,
  res: Response | any
): Promise<void> => {
  try {
    const { email, password } = req.body
    const user = await registerUser({ email, password })
    if (user.error === 'USER_EXIST') {
      return res.status(400).json({ message: 'User already exist' })
    }
    const token = generateToken(user._id)
    res.cookie('token', token, { httpOnly: true })
    res.status(201).json({ message: 'Register success' })
  } catch (error: any) {
    res.status(400).json({ message: 'Something went wrong' })
  }
}

export const loginController = async (
  req: Request,
  res: Response | any
): Promise<void> => {
  try {
    const { email, password } = req.body
    const user = await loginUser({ email, password })
    if (user.error === 'USER_NOT_EXIST') {
      return res.status(400).json({ message: 'User not exist' })
    }
    if (user.error === 'PASSWORD_NOT_MATCH') {
      return res.status(400).json({ message: 'Password not match' })
    }
    const token = generateToken(user._id)
    res.cookie('token', token, { httpOnly: true })
    res.status(200).json({ message: 'Login success' })
  } catch (error: any) {
    res.status(400).json({ message: 'Something went wrong' })
  }
}

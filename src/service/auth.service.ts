import UserModel from '../models/user'
import { user } from '../interfaces/user'

export const registerUser = async ({
  email,
  password
}: user): Promise<any> => {
  const checkIs = await UserModel.findOne({ email })
  if (checkIs != null) return { error: 'USER_EXIST' }
  const registerUser = await UserModel.create({
    email,
    password
  })
  return registerUser
}

export const loginUser = async ({ email, password }: user): Promise<any> => {
  const checkIs = await UserModel.findOne({ email })
  if (checkIs == null) return { error: 'USER_NOT_EXIST' }
  const checkPass = checkIs.password === password
  if (!checkPass) return { error: 'PASSWORD_NOT_MATCH' }
  return checkIs
}

import { hash, compare } from 'bcryptjs'

export const encrypt = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, 10)
  return hashedPassword
}

export const decodePass = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const isMatch = await compare(password, hashedPassword)
  return isMatch
}

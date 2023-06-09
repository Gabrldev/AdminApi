import jwt from 'jsonwebtoken'
export const generateToken = (id: string): string => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET ?? '', {
    expiresIn: '1d'
  })
  return token
}
export const verifyToken = (token: string): string | object => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET ?? '')
  return decoded
}

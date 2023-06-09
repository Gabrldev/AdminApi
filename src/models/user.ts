import { Schema, model } from 'mongoose'
import { UserRegister } from '../interfaces/user'

export const userSchema = new Schema<UserRegister>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'USER' }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
const userModel = model<UserRegister>('User', userSchema)

export default userModel

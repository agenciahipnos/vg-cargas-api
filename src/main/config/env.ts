import dotenv from 'dotenv'

dotenv.config()

export default {
  mongoUrl: process.env.MONGO_URL || '',
  port: process.env.PORT || 5050,
  jwt_secret: process.env.JWT_SECRET || '',
  jwt_expire_time: process.env.JWT_EXPIRE_TIME || '',
  public_key: process.env.PUBLIC_KEY || '',
  private_key: process.env.PRIVATE_KEY || ''
}

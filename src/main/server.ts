import mongoose from 'mongoose'
import 'module-alias/register'
import env from './config/env'
import { User } from '@/infra/db/mongodb/schemas/user-schema'

const initServer = async (): Promise<void> => {
  const app = (await import('./config/app')).default
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  mongoose.connect(
    'mongodb://localhost:27017/vg-cargas', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  app.listen(env.port)
}

initServer().then(async () => {
  await User.create({
    email: 'teste',
    password: 'teste',
    name: 'teste',
    cpf: 'teste',
    birthdate: 'teste',
    phone: 'teste',
    type: 'teste'
  })
  console.log(`
    #####################################################
    ##     Server running at http://localhost:${env.port}     ##
    #####################################################
  `)
}).catch((error) => {
  console.error(error)
})

import mongoose from 'mongoose'
import 'module-alias/register'
import env from './config/env'

require('@/infra/db/mongodb/schemas/address-schema')
require('@/infra/db/mongodb/schemas/user-schema')

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
  // const address = await Address.create({
  //   cep: 'any_cep',
  //   state: 'any_state',
  //   city: 'any_city',
  //   neighborhood: 'any_neighborhood',
  //   street: 'any_street',
  //   number: 'any_number',
  //   observations: 'any_observations',
  //   user: '6077700091b3a94cb41e1622'
  // })

  // console.log(address)

  // const user = await User.findOneAndUpdate({ _id: '6077700091b3a94cb41e1622' }, {
  //   email: 'desgraça'
  // })

  // console.log(user)

  // const address = await Address.findOne({ _id: '607775e2d84aa832c4322c03' }).populate('user')

  // console.log(address)

  // const user = await User.findOne({ _id: '6077700091b3a94cb41e1622' }).populate('address')

  // console.log(user)

  // const user = await User.create({
  //   address: [
  //     address
  //   ],
  //   driver: {
  //     vehicle: {
  //       modelo: 'any_modelo',
  //       marca: 'any_marca',
  //       ano: 'any_ano',
  //       capacidade_maxima: 'any_capacidade',
  //       categoria_veiculo: 'any_categoria',
  //       placa: 'any_placa',
  //       carroceria: 'any_carroceria',
  //       antt: 'any_antt',
  //       seguro: true,
  //       rastreador: true
  //     },
  //     freight: null,
  //     cnh: 'any_cnh'
  //   },
  //   company: null,
  //   email: 'any_email',
  //   password: 'any_password',
  //   name: 'any_name',
  //   cpf: 'any_cpf',
  //   birthdate: 'any_birthdate',
  //   phone: 'any_phone',
  //   type: 'any_type'
  // })

  // console.log(user) 6077700091b3a94cb41e1622

  // const address = await Address.findByIdAndUpdate('6077700091b3a94cb41e1621', {
  //   cep: 'desgraça'
  // }, (err, result) => {
  //   if (err) {
  //     console.log(err)
  //   }
  //   return result
  // })

  // console.log(address)

  // const user = await User.findById('6077700091b3a94cb41e1622')

  // console.log(user)

  console.log(`
    #####################################################
    ##     Server running at http://localhost:${env.port}     ##
    #####################################################
  `)
}).catch((error) => {
  console.error(error)
})

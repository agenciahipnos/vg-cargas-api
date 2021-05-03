import { Router } from 'express'
import { adaptRoute } from '../adapters/express-adapter-route'
import { makeCreateUserController } from '../factories/controllers/user/create-user-controller-factory'

export default (router: Router): void => {
  router.post('/user', adaptRoute(makeCreateUserController()))
}

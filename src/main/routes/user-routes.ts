import { Router } from 'express'
import { adaptRoute } from '../adapters/express-adapter-route'

export default (router: Router): void => {
  router.post('/usuario', adaptRoute())
}

import 'module-alias/register'
import env from './config/env'

const app = (await import('./config/app')).default
app.listen(env.port, () => console.log(`
  ####################################################
  ## Server running at http://localhost:${env.port} ##
  ####################################################
`))

import 'module-alias/register'
import env from './config/env'

const initServer = async (): Promise<void> => {
  const app = (await import('./config/app')).default
  app.listen(env.port)
}

initServer().then(() => {
  console.log(`
    ####################################################
    ## Server running at http://localhost:${env.port} ##
    ####################################################
  `)
}).catch((error) => {
  console.error(error)
})

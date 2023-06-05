import cors from 'cors'
import { expressMiddleware } from '@apollo/server/express4'

import bodyParser from 'body-parser'

import express from 'express'

import { config } from '~/config'
import { createApolloServer } from './server'

const run = async (): Promise<void> => {
  const app = express()
  // 📓 TODO: create context
  // 📓 TODO: add db connection

  const { apolloServer, httpServer } = await createApolloServer({ app })
  await apolloServer.start()

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json({ limit: '50mb' }),
    expressMiddleware(apolloServer)
  )
  httpServer.listen(config.port, () => {
    console.log(`Server listening at http://localhost:${config.port} 🚀`)
  })
}

void run().catch((error) => {
  console.error(error)
  process.exit(1)
})

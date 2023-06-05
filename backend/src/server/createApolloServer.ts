import { type Server, createServer } from 'http'
import { type Express } from 'express'

import { WebSocketServer } from 'ws'
import { generateSchema } from '~/schema'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'

import { ApolloServer } from '@apollo/server'

import { useServer } from 'graphql-ws/lib/use/ws'

interface CreateApolloServerArgs {
  app: Express
}

interface CreateApolloServerOutput {
  apolloServer: ApolloServer
  httpServer: Server
}

export const createApolloServer = async ({
  app
}: CreateApolloServerArgs): Promise<CreateApolloServerOutput> => {
  const httpServer = createServer(app)
  const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' })

  const schema = await generateSchema()

  const serverCleanup = useServer(
    {
      schema
    },
    wsServer
  )

  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        serverWillStart: async () => ({
          drainServer: async () => {
            await serverCleanup.dispose()
          }
        })
      }
    ]
  })

  return { apolloServer, httpServer }
}

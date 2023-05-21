import { typeDefs } from './typeDefs'
import resolvers from './modules/index'
import { makeExecutableSchema } from '@graphql-tools/schema'

import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const server = new WebSocketServer({
  port: 5000,
  path: '/graphql'
})

useServer({ schema }, server)

console.log('Web socket server is started 🚀')

import { createClient } from 'graphql-ws'

import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { ApolloClient, InMemoryCache } from '@apollo/client'

const link = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:5000/graphql'
  })
)

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link
})

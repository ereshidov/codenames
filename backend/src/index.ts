import { ApolloServer } from '@apollo/server'
import { gql } from 'graphql-tag'
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello, World!'
  }
}

const run = async (): Promise<void> => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
  })

  console.log(`🚀  Server ready at: ${String(url)}`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})

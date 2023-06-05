import { makeExecutableSchema } from '@graphql-tools/schema'
import { generateResolvers } from './resolvers'
import { typeDefs } from './typeDefs'

export const generateSchema = async (): Promise<
  ReturnType<typeof makeExecutableSchema>
> => {
  return makeExecutableSchema({
    typeDefs,
    ...(await generateResolvers())
  })
}

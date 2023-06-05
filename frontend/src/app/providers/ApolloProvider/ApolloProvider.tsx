import { ApolloProvider as ApolloProviderBase } from '@apollo/client'
import { PropsWithChildren } from 'react'

import { apolloClient } from '~/lib/apollo'

export const ApolloProvider = ({ children }: PropsWithChildren) => {
  return <ApolloProviderBase client={apolloClient} children={children} />
}

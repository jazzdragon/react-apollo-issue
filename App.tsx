import { ApolloProvider } from 'react-apollo'
import { Root } from 'native-base'
import createClient from './apolloClient'
import Home from './Home'
import React from 'react'

export default (): JSX.Element => {
  return (
    <Root>
      <ApolloProvider client={ createClient() }>
        <Home />
      </ApolloProvider>
    </Root>
  )
}

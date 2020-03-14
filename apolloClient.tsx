import * as SecureStore from 'expo-secure-store'
import { ApolloLink } from 'apollo-link'
import { ContextSetter, setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { Toast } from 'native-base'
import ApolloClient from 'apollo-client'
import fetch from 'unfetch'

const uri = 'http://localhost:3000/api/v3'
const cache = new InMemoryCache()

export const authLink: ContextSetter = async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await SecureStore.getItemAsync('LOGIN_TOKEN')

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `bearer ${token}`
    }
  }
}

const errorHandler = (response): void => {
  if (response.networkError?.statusCode === 401) {
    // TODO: handle in a way that doesn't produce a warning
  }

  if (response.graphQLErrors) {
    response.graphQLErrors.forEach((err) => {
      Toast.show({
        text: err.message.replace(/GraphQL error: /, ''),
        type: 'danger'
      })
    })
  }
}

const link = (path): ApolloLink =>
  ApolloLink.from([
    onError(errorHandler),
    setContext(authLink),
    new HttpLink({
      uri: `${uri}${path}`,
      fetch
    })
  ])

const createClient = (path = ''): ApolloClient<any> =>
  new ApolloClient({
    cache,
    link: link(path),
  })


export default createClient

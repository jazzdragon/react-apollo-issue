import { Text, View } from 'react-native'
import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export const query = gql`
  query viewer {
    viewer {
      id
      fullName
    }
  }
`

const Home = (): JSX.Element => {
  const { data, loading } = useQuery(query)

  return (
    <View style={ styles.container }>
      <Text>Welcome Home, { loading ? 'stranger' : data?.viewer?.fullName }.</Text>
    </View>
  )
}

export default Home

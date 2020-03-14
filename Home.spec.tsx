import { MockedProvider, MockedResponse } from '@apollo/react-testing'
import { render, RenderResult, wait } from '@testing-library/react-native'
import Home, { query } from './Home'
import React from 'react'

const mocks: MockedResponse[] = [
  {
    request: {
      query
    },
    result: {
      data: {
        viewer: {
          id: 1,
          fullName: 'Pete Peterson',
        }
      }
    }
  }
]

describe('Home', (): void => {
  const setup = (): RenderResult => {
    return render(
      <MockedProvider mocks={ mocks }>
        <Home />
      </MockedProvider>
    )
  }

  // This test fails, the component is stuck in a loading state
  it('shows user name', async(): Promise<void> => {
    const { getByText, debug } = setup()
    await wait(() => {
      expect(getByText('Welcome Home, Pete Peterson.')).toBeTruthy()
      debug()
    })
  })
})

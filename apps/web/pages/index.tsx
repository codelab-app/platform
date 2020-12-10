import React from 'react'
import { withApollo } from '@codelab/ddd/frontend/model/store/apollo/apolloClient'

const HomePage = () => {
  return <h1>Home</h1>
}

export default withApollo(HomePage)

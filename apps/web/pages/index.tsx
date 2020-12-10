import React from 'react'
import { withApollo } from '@codelab/ddd/frontend/model/store/apollo/apolloClient'
import { UserSignupButton } from '@codelab/ddd/modules/users-stories'

const HomePage = () => {
  return <UserSignupButton />
}

export default withApollo(HomePage)

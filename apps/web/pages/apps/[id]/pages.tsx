import { useRouter } from 'next/router'
import React from 'react'
import { withApollo } from '@codelab/frontend'

const AppPagePage = () => {
  const router = useRouter()

  console.log(router)

  return <h1>Pages</h1>
}

export default withApollo(AppPagePage)

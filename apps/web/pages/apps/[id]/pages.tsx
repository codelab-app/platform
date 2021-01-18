import { useRouter } from 'next/router'
import * as R from 'ramda'
import React from 'react'
import { withApollo } from '@codelab/frontend'

const AppPagePage = () => {
  const router = useRouter()

  return <h1>Pages</h1>
}

export default R.pipe(withApollo, AppPagePage)

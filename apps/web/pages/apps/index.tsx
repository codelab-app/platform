import React from 'react'
import { withApollo } from '@codelab/frontend'
import { CreateAppButton } from '@codelab/modules/app-stories'

const AppsPage = () => {
  return (
    <section>
      <h1>Apps</h1>
      <CreateAppButton />
    </section>
  )
}

export default withApollo(AppsPage)

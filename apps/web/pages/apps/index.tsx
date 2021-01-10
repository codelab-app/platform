import React from 'react'
import { withApollo } from '@codelab/frontend'
import { CreateAppButton, GetAppsList } from '@codelab/modules/app-stories'

const AppsPage = () => {
  return (
    <section>
      <h1>Apps</h1>
      <CreateAppButton />
      <GetAppsList />
    </section>
  )
}

export default withApollo(AppsPage)

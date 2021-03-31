import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

const AppItem = ({ app }: any) => <div>{app.title}</div>

export default createFragmentContainer(AppItem, {
  app: graphql`
    fragment AppItem_app on app {
      id
    }
  `,
})

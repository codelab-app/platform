import React from 'react'
import { useFragment } from 'react-relay'
import { appFragment } from '../AppFragment'
import { AppFragment_app$key } from '../__generated__/AppFragment_app.graphql'

interface AppItemProps {
  app: AppFragment_app$key
}

export const AppItem = (props: AppItemProps) => {
  const { app } = props
  const appData = useFragment(appFragment, app)

  return <div>{appData.id}</div>
}

import React, { FunctionComponent } from 'react'

export interface GetAppsItemProps {
  app: { title: string }
}

const GetAppsItem: FunctionComponent<GetAppsItemProps> = ({ app }) => {
  return <>{app.title}</>
}

export default GetAppsItem

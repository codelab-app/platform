import { DgraphClient } from 'dgraph-js-http'
import React, { PropsWithChildren } from 'react'

type IDgraphContext = {
  client: DgraphClient
}

export const DgraphContext = React.createContext<IDgraphContext>(undefined!)

export const DgraphProvider = ({
  children,
  client,
}: PropsWithChildren<IDgraphContext>) => {
  if (!client) {
    throw new Error('Missing Dgraph client!')
  }

  return (
    <DgraphContext.Provider value={{ client }}>
      <>{children}</>
    </DgraphContext.Provider>
  )
}

import React, { PropsWithChildren } from 'react'

interface NodeServiceContextProps {
  nodeService: any
}

export const NodeServiceContext = React.createContext<NodeServiceContextProps>({
  nodeService: undefined,
})

export const NodeServiceProvider = (
  props: PropsWithChildren<NodeServiceContextProps>,
) => {
  const { children, nodeService } = props

  return (
    <NodeServiceContext.Provider value={{ nodeService }}>
      {children}
    </NodeServiceContext.Provider>
  )
}

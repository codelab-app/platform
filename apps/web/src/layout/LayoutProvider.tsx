import React, { PropsWithChildren } from 'react'
import { Layout, useGetLayoutQuery } from '@codelab/generated'

type ILayoutContext = Layout

export const LayoutContext = React.createContext<ILayoutContext>(undefined!)

export const LayoutProvider = ({ children }: PropsWithChildren<{}>) => {
  const { data: layoutData, loading: layoutLoading } = useGetLayoutQuery()

  const layout = layoutData?.getLayout

  if (layoutLoading || !layout) {
    return null
  }

  return (
    <LayoutContext.Provider
      value={{
        ...layout,
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

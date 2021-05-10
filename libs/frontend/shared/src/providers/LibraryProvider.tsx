import { LibraryExplorerQuery, useLibraryExplorerQuery } from '@codelab/dgraph'
import React, { PropsWithChildren } from 'react'

type ILibraryContext = {
  libraries?: LibraryExplorerQuery['libraries']
  loading: boolean
}

export const LibraryContext = React.createContext<ILibraryContext>(undefined!)

export const LibraryProvider = ({
  children,
}: PropsWithChildren<Record<string, unknown>>) => {
  const { data, loading } = useLibraryExplorerQuery()

  return (
    <LibraryContext.Provider
      value={{
        libraries: data?.libraries ?? [],
        loading,
      }}
    >
      {loading ? <></> : children}
    </LibraryContext.Provider>
  )
}

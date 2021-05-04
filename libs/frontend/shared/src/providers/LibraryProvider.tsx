import { LibraryExplorerQuery, useLibraryExplorerQuery } from '@codelab/hasura'
import React, { PropsWithChildren } from 'react'

type ILibraryContext = {
  libraries?: LibraryExplorerQuery['library']
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
        libraries: data?.library ?? [],
        loading,
      }}
    >
      {loading ? <></> : children}
    </LibraryContext.Provider>
  )
}

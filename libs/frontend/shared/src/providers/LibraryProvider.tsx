import React, { PropsWithChildren } from 'react'
import { GetLibrariesQuery, useGetLibrariesQuery } from '@codelab/hasura'

type ILibraryContext = {
  libraries?: GetLibrariesQuery['library']
  loading: boolean
}

export const LibraryContext = React.createContext<ILibraryContext>(undefined!)

export const LibraryProvider = ({
  children,
}: PropsWithChildren<Record<string, unknown>>) => {
  const { data, loading } = useGetLibrariesQuery()

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

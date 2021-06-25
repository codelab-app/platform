import {
  LibraryExplorer__LibraryFragment,
  useLibraryExplorerQuery,
} from '@codelab/codegen/dgraph'
import React, { PropsWithChildren } from 'react'

type ILibraryContext = {
  libraries?: Array<LibraryExplorer__LibraryFragment>
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
        libraries: data?.libraries?.filter(
          (library): library is LibraryExplorer__LibraryFragment => !!library,
        ),
        loading,
      }}
    >
      {loading ? <></> : children}
    </LibraryContext.Provider>
  )
}

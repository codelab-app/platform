import React, { PropsWithChildren } from 'react'

type ILibraryContext = {
  libraries?: Array<any>
  loading: boolean
}

export const LibraryContext = React.createContext<ILibraryContext>(undefined!)

export const LibraryProvider = ({
  children,
}: PropsWithChildren<Record<string, unknown>>) => {
  // const { data, loading } = useLibraryExplorerQuery()
  const loading = false

  return (
    <LibraryContext.Provider
      value={{
        libraries: [],
        //   data?.libraries?.filter(
        //   (library): library is LibraryExplorer__LibraryFragment => !!library,
        // ),
        loading,
      }}
    >
      {loading ? <></> : children}
    </LibraryContext.Provider>
  )
}

import React, { PropsWithChildren } from 'react'

type ILibraryContext = {
  libraries?: Array<any>
  loading: boolean
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const LibraryContext = React.createContext<ILibraryContext>(undefined!)

export const LibraryProvider = ({ children }: PropsWithChildren<never>) => {
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
      {loading ? null : children}
    </LibraryContext.Provider>
  )
}

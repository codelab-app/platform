import { getApolloClient } from '@codelab/frontend/model/infra/apollo'
import { notify } from '@codelab/frontend/shared/utils'
import { useEffect } from 'react'

const SELECTED_LIBRARY_KEY = 'codelab_selected_library'

const fetchAndSelectFirstLibrary = (
  selectLibrary: (libraryId: string) => void,
) => {
  return getApolloClient()
    .query({
      query: null!,
      // query: GetFirstLibraryGql,
    })
    .then((r) => {
      if (r.data?.library && r.data?.library[0]) {
        selectLibrary(r.data.library[0]?.id)
      } else {
        notify({
          title: "You don't have a library",
          content: 'Go and create one, so that forms will work',
          type: 'warning',
        })
      }
    })
}

/**
 * This controls the library selection states.
 * It holds the currently selected library for the builder
 * The selected library is stored in localstorage and automatically loaded when this is called
 * By default, the first library is selected if nothing is found in localstorage
 *
 * We can expand this in the future to be able to "select" the current working library and only
 * show components/atoms/styles that are connected to it
 */
export const useSelectedLibrary = () => {
  // const { data } = useGetLibraryQuery({
  //   skip: !state.selectedLibraryId,
  //   variables: {
  //     libraryId: state.selectedLibraryId ?? '',
  //   },
  // })

  const selectLibrary = (libraryId: string) => {
    localStorage.setItem(SELECTED_LIBRARY_KEY, libraryId)
  }

  useEffect(() => {
    // Get stored library from localStorage
    const item = localStorage.getItem(SELECTED_LIBRARY_KEY)

    // Check if we have anything stored and if it's valid
    if (item) {
      getApolloClient()
        .query({
          query: null!,
          variables: {
            libraryId: item,
          },
        })
        .then((r) => {
          if (r.data?.library_by_pk) {
            // We know that it's valid, select it
            selectLibrary(item)
          } else {
            fetchAndSelectFirstLibrary(selectLibrary).catch((err) =>
              console.error(err),
            )
          }
        })
        .catch((err) => console.error(err))
    }
    // else if (!state.selectedLibraryId) {
    //   fetchAndSelectFirstLibrary(selectLibrary).catch((e) => console.error(e))
    // }
  }, [])

  return {
    selectLibrary,
    library: null!,
  }
}

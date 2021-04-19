import { atom, useRecoilState } from 'recoil'
import { GetFirstLibraryGql, useGetLibraryQuery } from '@codelab/hasura'
import { useEffect } from 'react'
import { getApolloClient } from '@codelab/frontend/apollo'
import { notify } from '@codelab/frontend/shared'

/**
 * This holds the currently selected library for the builder
 */
const librarySelectionState = atom<{ selectedLibraryId: string | undefined }>({
  key: 'librarySelectionState',
  default: {
    selectedLibraryId: undefined,
  },
})

const SELECTED_LIBRARY_KEY = 'codelab_selected_library'

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
  const [state, setState] = useRecoilState(librarySelectionState)

  const { data } = useGetLibraryQuery({
    variables: {
      libraryId: state.selectedLibraryId,
    },
  })

  const selectLibrary = (libraryId: string) => {
    setState({
      selectedLibraryId: libraryId,
    })
    localStorage.setItem(SELECTED_LIBRARY_KEY, libraryId)
  }

  useEffect(() => {
    const item = localStorage.getItem(SELECTED_LIBRARY_KEY)

    if (item && item !== state.selectedLibraryId) {
      selectLibrary(item)
    } else if (!state.selectedLibraryId) {
      //Select the first library from the user
      getApolloClient()
        .query({
          query: GetFirstLibraryGql,
        })
        .then((r) => {
          if (r.data?.library && r.data?.library[0]) {
            selectLibrary(r.data.library[0].id)
          } else {
            notify({
              title: "You don't have a library",
              content: 'Go and create one, so that forms will work',
              type: 'warning',
            })
          }
        })
    }
  }, [])

  return {
    selectLibrary,
    library: data?.library_by_pk,
    state,
  }
}

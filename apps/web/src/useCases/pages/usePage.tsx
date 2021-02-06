import { useContext } from 'react'
import { atom, useRecoilState } from 'recoil'
import { useLayoutMutation } from '../../builder/useLayoutMutation'
import { LayoutContext } from '../../layout/LayoutProvider'
import { LayoutPaneVisibility } from '@codelab/generated'

export type CrudAction = 'create' | 'update'

export const pageState = atom<string>({
  key: 'page',
  default: '',
})

// type UsePage = {
//   togglePageDetailPane: any
//   detailPageId: string
//   resetPage: (pane: LayoutPaneVisibility) => void
//   startCreatePage: Function
//   updatePage(pageId: string): void
// }

export const usePage = () => {
  const layout = useContext(LayoutContext)
  const { setLayout, setPaneVisibility } = useLayoutMutation(layout)
  const [detailPageId, setDetailPageId] = useRecoilState(pageState)

  const openCreatePage = () => {
    setPaneVisibility(LayoutPaneVisibility.Both)

    return setDetailPageId('')
  }

  const openUpdatePage = (pageId: string) => {
    // layout.setPane(LayoutPane.Both)

    return setDetailPageId(pageId)
  }

  const resetPage = (
    pane: LayoutPaneVisibility = LayoutPaneVisibility.None,
  ) => {
    setLayout({
      variables: {
        input: {
          paneVisibility: pane,
        },
      },
    })
    // layout.setPane(pane)
    setDetailPageId('')
  }

  const togglePageDetailPane = (id: string) => {
    let newPaneVisibility: LayoutPaneVisibility = LayoutPaneVisibility.Both
    let newId = id

    // If same id & closing detail pane
    if (
      id === detailPageId &&
      layout.paneVisibility === LayoutPaneVisibility.Both
    ) {
      newPaneVisibility = LayoutPaneVisibility.Main
      newId = ''
    }

    // If same id & opening detail pane
    if (
      id === detailPageId &&
      layout.paneVisibility === LayoutPaneVisibility.Main
    ) {
      newPaneVisibility = LayoutPaneVisibility.Both
    }

    return setLayout({
      variables: {
        input: {
          paneVisibility: newPaneVisibility,
        },
      },
    }).then(() => setDetailPageId(newId))
  }

  return {
    togglePageDetailPane,
    openCreatePage,
    openUpdatePage,
    resetPage,
    setPaneVisibility,
    detailPageId,
  }
}

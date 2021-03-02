import { atom, useRecoilState } from 'recoil'
import { LayoutPaneVisibility, useLayout } from '../../layout/layout-state'

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
  const [detailPageId, setDetailPageId] = useRecoilState(pageState)

  const { setPaneVisibility, layout } = useLayout()

  const openCreatePage = () => {
    setPaneVisibility(LayoutPaneVisibility.Detail)

    return setDetailPageId('')
  }

  const openUpdatePage = (pageId: string) => {
    // layout.setPane(LayoutPane.Both)

    return setDetailPageId(pageId)
  }

  const resetPage = (
    pane: LayoutPaneVisibility = LayoutPaneVisibility.None,
  ) => {
    setPaneVisibility(pane)
    setDetailPageId('')
  }

  const togglePageDetailPane = (id: string) => {
    let newPaneVisibility: LayoutPaneVisibility = LayoutPaneVisibility.Detail
    let newId = id

    // If same id & closing detail pane
    if (
      id === detailPageId &&
      layout.paneVisibility === LayoutPaneVisibility.Detail
    ) {
      newPaneVisibility = LayoutPaneVisibility.Main
      newId = ''
    }

    // If same id & opening detail pane
    if (
      id === detailPageId &&
      layout.paneVisibility === LayoutPaneVisibility.Main
    ) {
      newPaneVisibility = LayoutPaneVisibility.Detail
    }

    setPaneVisibility(newPaneVisibility)
    setDetailPageId(newId)
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

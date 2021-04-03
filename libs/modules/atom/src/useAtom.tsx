import { atom, useRecoilState } from 'recoil'
import { LayoutPaneVisibility, useLayout } from '@codelab/frontend/layout'

export type CrudAction = 'create' | 'update'

export const atomState = atom<string>({
  key: 'atom',
  default: '',
})

export const useAtom = () => {
  const [detailAtomId, setDetailAtomId] = useRecoilState(atomState)

  const { setPaneVisibility, layout } = useLayout()

  const openCreateAtom = () => {
    setPaneVisibility(LayoutPaneVisibility.Detail)

    return setDetailAtomId('')
  }

  const openUpdateAtom = (pageId: string) => {
    // layout.setPane(LayoutPane.Both)

    return setDetailAtomId(pageId)
  }

  const resetAtom = (
    pane: LayoutPaneVisibility = LayoutPaneVisibility.None,
  ) => {
    setPaneVisibility(pane)
    setDetailAtomId('')
  }

  const toggleAtomDetailPane = (id: string) => {
    let newPaneVisibility: LayoutPaneVisibility = LayoutPaneVisibility.Detail
    let newId = id

    // If same id & closing detail pane
    if (
      id === detailAtomId &&
      layout.paneVisibility === LayoutPaneVisibility.Detail
    ) {
      newPaneVisibility = LayoutPaneVisibility.Main
      newId = ''
    }

    // If same id & opening detail pane
    if (
      id === detailAtomId &&
      layout.paneVisibility === LayoutPaneVisibility.Main
    ) {
      newPaneVisibility = LayoutPaneVisibility.Detail
    }

    setPaneVisibility(newPaneVisibility)
    setDetailAtomId(newId)
  }

  return {
    toggleAtomDetailPane,
    openCreateAtom,
    openUpdateAtom,
    resetAtom,
    setPaneVisibility,
    detailAtomId,
  }
}

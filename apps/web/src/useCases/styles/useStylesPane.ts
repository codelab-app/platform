import { atom, useRecoilState } from 'recoil'
import {
  LayoutPaneVisibility,
  LayoutTab,
  useLayout,
} from '../../templates/layout-state'

export interface StylesPaneStateType {
  selectedId: string | undefined
}

export const stylePaneState = atom<StylesPaneStateType>({
  key: 'stylesPane',
  default: {
    selectedId: undefined,
  },
})

export const useStylesPane = () => {
  const [state, setState] = useRecoilState(stylePaneState)

  const { setPaneVisibility, layout, toggleTab } = useLayout()

  const openCreateStyle = () => {
    toggleTab(LayoutTab.Styles)
    setPaneVisibility(LayoutPaneVisibility.Detail)

    return setState({ selectedId: undefined })
  }

  const openUpdateStyle = (styleId: string) => {
    toggleTab(LayoutTab.Styles)
    setPaneVisibility(LayoutPaneVisibility.Detail)

    return setState({ selectedId: styleId })
  }

  const resetPane = (
    pane: LayoutPaneVisibility = LayoutPaneVisibility.None,
  ) => {
    setPaneVisibility(pane)

    return setState({ selectedId: undefined })
  }

  const toggleStyleDetailPane = (id: string) => {
    let newPaneVisibility: LayoutPaneVisibility = LayoutPaneVisibility.Detail
    let newId: StylesPaneStateType['selectedId'] = id

    // If same id & closing detail pane
    if (
      id === state.selectedId &&
      layout.paneVisibility === LayoutPaneVisibility.Detail
    ) {
      newPaneVisibility = LayoutPaneVisibility.Main
      newId = undefined
    }

    // If same id & opening detail pane
    if (
      id === state.selectedId &&
      layout.paneVisibility === LayoutPaneVisibility.Main
    ) {
      newPaneVisibility = LayoutPaneVisibility.Detail
    }

    setPaneVisibility(newPaneVisibility)

    return setState({ selectedId: newId })
  }

  return {
    toggleStyleDetailPane,
    openCreateStyle,
    openUpdateStyle,
    resetPane,
    setPaneVisibility,
    detailStyleId: state.selectedId,
  }
}

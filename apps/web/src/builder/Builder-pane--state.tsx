import { atom, useRecoilState } from 'recoil'
import { LayoutPane, LayoutPaneVisibility, LayoutTab } from '@codelab/generated'

export interface UseBuilderLayout {
  setTab(name: LayoutTab): void
  setPane(name: LayoutPane): void
  setPaneVisibility(name: LayoutPaneVisibility): void
  tab: LayoutTab
  pane: LayoutPane
  paneVisibility: LayoutPaneVisibility
}

const builderTabState = atom<LayoutTab>({
  key: 'builderTab',
  default: LayoutTab.Page,
})

const builderPaneState = atom<LayoutPane>({
  key: 'builderPane',
  default: LayoutPane.None,
})

const builderPaneVisibilityState = atom<LayoutPaneVisibility>({
  key: 'builderPaneVisibility',
  default: LayoutPaneVisibility.Both,
})

export const useBuilderLayout = (): UseBuilderLayout => {
  const [tab, _setTab] = useRecoilState<LayoutTab>(builderTabState)
  const [pane, _setPane] = useRecoilState<LayoutPane>(builderPaneState)
  const [paneVisibility, _setPaneVisibility] = useRecoilState(
    builderPaneVisibilityState,
  )

  const setTab = (name: LayoutTab) => {
    _setPaneVisibility(LayoutPaneVisibility.Both)

    // If same tab
    if (tab === name) {
      pane === LayoutPane.None
        ? _setPane(LayoutPane.Main)
        : _setPane(LayoutPane.None)
    } else {
      pane === LayoutPane.None ? _setPane(LayoutPane.Main) : _setPane(pane)
    }

    _setTab(name)
  }

  const setPane = (name: LayoutPane) => {
    _setPaneVisibility(LayoutPaneVisibility.Both)

    _setPane(name)
  }

  const setPaneVisibility = (name: LayoutPaneVisibility) => {
    _setPaneVisibility(name)
  }

  return {
    setTab,
    setPane,
    setPaneVisibility,
    tab,
    pane,
    paneVisibility,
  }
}

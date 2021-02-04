import { atom, useRecoilState } from 'recoil'

type BuilderTabs = 'component' | 'page' | 'tree'
export type BuilderPane = 'main' | 'detail' | 'both' | 'none'

interface UseBuilderLayout {
  setTab(name: BuilderTabs): void
  setPane(name: BuilderPane): void
  tab: BuilderTabs
  pane: BuilderPane
}

const builderTabState = atom<BuilderTabs>({
  key: 'builderTab',
  default: 'page',
})

const builderPaneState = atom<BuilderPane>({
  key: 'builderPane',
  default: 'none',
})

export const useBuilderLayout = (): UseBuilderLayout => {
  const [tab, _setTab] = useRecoilState<BuilderTabs>(builderTabState)
  const [pane, _setPane] = useRecoilState<BuilderPane>(builderPaneState)

  const setTab = (name: BuilderTabs) => {
    // If same tab
    if (tab === name) {
      pane === 'none' ? _setPane('main') : _setPane('none')
    } else {
      pane === 'none' ? _setPane('main') : _setPane(pane)
    }

    _setTab(name)
  }

  const setPane = (name: BuilderPane) => {
    _setPane(name)
  }

  return {
    setTab,
    setPane,
    tab,
    pane,
  }
}

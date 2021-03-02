import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

export enum LayoutTab {
  Component = 'Component',
  Page = 'Page',
  Tree = 'Tree',
}

export enum LayoutPane {
  Main = 'Main',
  Detail = 'Detail',
  Both = 'Both',
  None = 'None',
}

export enum LayoutPaneVisibility {
  Main = 'Main',
  Detail = 'Detail',
  Both = 'Both',
  None = 'None',
}

export interface LayoutStateType {
  tab?: LayoutTab
  pane: LayoutPane
  paneVisibility: LayoutPaneVisibility
}

export const layoutState = atom<LayoutStateType>({
  key: 'layout',
  default: {
    tab: undefined,
    pane: LayoutPane.None,
    paneVisibility: LayoutPaneVisibility.None,
  },
})

export interface UseLayoutData {
  toggleTab: (tab: LayoutTab) => void
  setPaneVisibility: (paneVisibility: LayoutPaneVisibility) => void
  layout: LayoutStateType
}

export const useLayout = (): UseLayoutData => {
  const [layout, setLayout] = useRecoilState(layoutState)

  const toggleTab = useCallback(
    (tab: LayoutTab) => {
      setLayout((l) => ({
        ...l,
        tab,
        paneVisibility: LayoutPaneVisibility.Main,
      }))
    },
    [setLayout],
  )

  const setPaneVisibility = useCallback(
    (paneVisibility: LayoutPaneVisibility) =>
      setLayout((l) => ({ ...l, paneVisibility })),
    [setLayout],
  )

  return { toggleTab, setPaneVisibility, layout }
}

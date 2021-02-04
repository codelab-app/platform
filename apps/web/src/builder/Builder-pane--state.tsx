import { useState } from 'react'
import { atom, useRecoilState } from 'recoil'

type VisibilityState = {
  visible: boolean
}

export const builderPaneMainState = atom<VisibilityState>({
  key: 'pane-main',
  default: {
    visible: false,
  },
})

export const builderPaneDetailsState = atom<VisibilityState>({
  key: 'pain-details',
  default: {
    visible: false,
  },
})

type BuilderLayout = {
  tab: 'component' | 'page' | 'tree'
  pane: 'main' | 'detail'
}

interface UseBuilderLayout {
  navigation: {
    visible: boolean
    toggle(visible?: boolean): void
  }
  details: {
    visible: boolean
    toggle(visible?: boolean): void
  }
}

export const useBuilderLayout = (): UseBuilderLayout => {
  const [paneMainState, setPaneMainState] = useRecoilState(builderPaneMainState)
  const [paneDetailsState, setPaneDetailsState] = useRecoilState(
    builderPaneDetailsState,
  )
  const [tab, setTab] = useState()

  return {
    navigation: {
      visible: paneMainState.visible,
      /**
       * When we close the `navigation panel`, we want to close the details as well
       */
      toggle: (visible?: boolean) => {
        setPaneMainState({
          visible: visible ?? !paneMainState.visible,
        })

        /**
         * When we close the `navigation panel`, we want to close the details as well
         */
        if (paneMainState.visible) {
          setPaneDetailsState({
            visible: false,
          })
        }
      },
    },
    details: {
      visible: paneDetailsState.visible,
      toggle: (visible?: boolean) =>
        setPaneDetailsState({
          visible: visible ?? !paneDetailsState.visible,
        }),
    },
  }
}

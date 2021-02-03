import { atom, useRecoilState } from 'recoil'

type VisibilityState = {
  visible: boolean
}

export const builderNavigationPanelState = atom<VisibilityState>({
  key: 'builderNavigation',
  default: {
    visible: false,
  },
})

export const builderDetailsPanelState = atom<VisibilityState>({
  key: 'builderDetails',
  default: {
    visible: false,
  },
})

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
  const [navigationState, setNavigationState] = useRecoilState(
    builderNavigationPanelState,
  )
  const [detailsState, setDetailsState] = useRecoilState(
    builderDetailsPanelState,
  )

  return {
    navigation: {
      visible: navigationState.visible,
      /**
       * When we close the `navigation panel`, we want to close the details as well
       */
      toggle: (visible?: boolean) => {
        setNavigationState({
          visible: visible ?? !navigationState.visible,
        })

        /**
         * When we close the `navigation panel`, we want to close the details as well
         */
        if (navigationState.visible) {
          setDetailsState({
            visible: false,
          })
        }
      },
    },
    details: {
      visible: detailsState.visible,
      toggle: (visible?: boolean) =>
        setDetailsState({
          visible: visible ?? !detailsState.visible,
        }),
    },
  }
}

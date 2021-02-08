import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import {
  OverlayToolbarStateType,
  overlayToolbarState,
} from './overlayToolbarState'

export const useOverlayToolbar = (overlayId: string) => {
  const [toolbarState, setToolbarState] = useRecoilState(
    overlayToolbarState(overlayId),
  )

  const show = useCallback(
    (
      overlayElement: OverlayToolbarStateType['overlayElement'],
      metadata: any = undefined,
    ) => {
      console.log(overlayElement, toolbarState.overlayElement)
      console.log(overlayElement !== toolbarState.overlayElement)

      /**
       * Only set if element exists, otherwise we will get infinite loop
       *
       * Only setState if the values are different
       */
      return overlayElement && overlayElement !== toolbarState.overlayElement
        ? setToolbarState((s) => ({ ...s, overlayElement, metadata }))
        : null
    },
    [setToolbarState, toolbarState],
  )

  const reset = useCallback(
    () => setToolbarState((s) => ({ ...s, overlayElement: undefined })),
    [setToolbarState],
  )

  return {
    show,
    reset,
  }
}

export type UseOverlayToolbarFunctions = ReturnType<typeof useOverlayToolbar>

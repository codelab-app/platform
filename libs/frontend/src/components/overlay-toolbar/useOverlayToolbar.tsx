import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import {
  OverlayToolbarStateType,
  overlayToolbarState,
} from './overlayToolbarState'
import { NodeA } from 'libs/modules/graph/src/core/domain/node/Node'

export const useOverlayToolbar = (overlayId: string) => {
  const [toolbarState, setToolbarState] = useRecoilState(
    overlayToolbarState(overlayId),
  )

  const show = useCallback(
    (
      overlayElement: OverlayToolbarStateType['overlayElement'],
      metadata?: Pick<NodeA, 'id' | 'type'>,
    ) => {
      console.log(overlayElement, metadata)
      // console.log(overlayElement, toolbarState.overlayElement)
      // console.log(overlayElement !== toolbarState.overlayElement)

      /**
       * Only set if element exists, otherwise we will get infinite loop
       *
       * Only setState if the values are different
       */
      return setToolbarState((s) => ({ ...s, overlayElement, metadata }))
    },
    [setToolbarState],
  )

  const reset = useCallback(() => {
    return setToolbarState((s) => ({ ...s, overlayElement: undefined }))
  }, [setToolbarState])

  return {
    show,
    reset,
  }
}

export type UseOverlayToolbarFunctions = ReturnType<typeof useOverlayToolbar>

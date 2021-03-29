import { useCallback, useRef } from 'react'
import { useRecoilState } from 'recoil'
import {
  OverlayToolbarStateType,
  overlayToolbarState,
} from './overlayToolbarState'
import { CLICK_OVERLAY_ID, NodeA } from '@codelab/frontend/shared'

export const useOverlayToolbar = (overlayId: string) => {
  const [toolbarState, setToolbarState] = useRecoilState(
    overlayToolbarState(overlayId),
  )
  const idRef = useRef('')

  const show = useCallback(
    (
      overlayElement: OverlayToolbarStateType['overlayElement'],
      metadata?: Pick<NodeA, 'id' | 'type'>,
    ) => {
      /**
       * Don't set toolbar if we're clicking on same item
       *
       * Hover is okay because impossible to hover same id twice, must exist container to re-trigger
       */
      if (overlayId === CLICK_OVERLAY_ID && idRef.current !== metadata?.id) {
        idRef.current = metadata?.id ?? ''

        return setToolbarState((s) => ({ ...s, overlayElement, metadata }))
      }

      return setToolbarState((s) => ({ ...s, overlayElement, metadata }))
    },
    [setToolbarState],
  )

  const reset = useCallback(() => {
    return setToolbarState((s) => ({
      ...s,
      overlayElement: undefined,
      metadata: undefined,
    }))
  }, [setToolbarState])

  return {
    show,
    reset,
    toolbarState,
  }
}

export type UseOverlayToolbarFunctions = ReturnType<typeof useOverlayToolbar>

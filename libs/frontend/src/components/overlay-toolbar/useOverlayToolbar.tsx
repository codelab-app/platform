import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import {
  OverlayToolbarStateType,
  overlayToolbarState,
} from './overlayToolbarState'

export const useOverlayToolbar = (overlayId: string) => {
  const [, setState] = useRecoilState(overlayToolbarState(overlayId))

  const show = useCallback(
    (
      overlayElement: OverlayToolbarStateType['overlayElement'],
      metadata: any = undefined,
    ) => setState((s) => ({ ...s, overlayElement, metadata })),
    [setState],
  )

  const reset = useCallback(
    () => setState((s) => ({ ...s, overlayElement: undefined })),
    [setState],
  )

  return {
    show,
    reset,
  }
}

export type UseOverlayToolbarFunctions = ReturnType<typeof useOverlayToolbar>

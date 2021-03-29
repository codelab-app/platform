import { memoize } from 'lodash'
import { RefObject } from 'react'
import { atom } from 'recoil'

export interface OverlayToolbarStateType {
  overlayElement: RefObject<HTMLElement> | HTMLElement | null | undefined
  metadata: any
}

export const initialOverlayState: OverlayToolbarStateType = {
  overlayElement: undefined,
  metadata: undefined,
}

export const overlayToolbarState = memoize((id: string) =>
  atom<OverlayToolbarStateType>({
    key: `overlayToolbarState${id}`,
    default: initialOverlayState,
  }),
)

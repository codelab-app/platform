import type { ReactNode, RefObject } from 'react'

export interface InternalDragData {
  overlayRenderer(ref?: RefObject<HTMLDivElement | null>): ReactNode
}

export type WithInternalDragData<T> = T & {
  internalUseOnlyDragData: InternalDragData
}

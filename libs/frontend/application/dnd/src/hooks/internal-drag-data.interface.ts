import type { ReactNode, RefObject } from 'react'

export interface InternalDragData {
  overlayRenderer(ref?: RefObject<HTMLDivElement>): ReactNode
}

export type WithInternalDragData<T> = T & {
  internalUseOnlyDragData: InternalDragData
}

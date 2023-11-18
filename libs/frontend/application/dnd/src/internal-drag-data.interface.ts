import type { ReactNode } from 'react'

export interface InternalDragData {
  overlayRenderer(): ReactNode
}

export type WithInternalDragData<T> = T & {
  internalUseOnlyDragData: InternalDragData
}

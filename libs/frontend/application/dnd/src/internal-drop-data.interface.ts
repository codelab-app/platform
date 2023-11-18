import type { HierarchyData } from './collision-detection'

export interface InternalDropData {
  hierarchy: HierarchyData
}

export type WithInternalDropData<T> = T & {
  internalUseOnlyDropData: InternalDropData
}

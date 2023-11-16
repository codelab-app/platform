import type { AnyData } from '@codelab/shared/abstract/types'
import { useDroppable } from '@dnd-kit/core'

export const useTypedDroppable = <T>({
  data,
  ...rest
}: Parameters<typeof useDroppable>[0] & {
  data?: T
}) => useDroppable({ data, ...rest })

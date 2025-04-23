import type { UseDraggableArguments } from '@dnd-kit/core'

import { useDraggable } from '@dnd-kit/core'

export const useTypedDraggable = <T>({
  data,
  ...rest
}: UseDraggableArguments & {
  data?: T
}) => useDraggable({ data, ...rest })

import { useDraggable } from '@dnd-kit/core'

export const useTypedDraggable = <T>({
  data,
  ...rest
}: Parameters<typeof useDraggable>[0] & {
  data?: T
}) => useDraggable({ data, ...rest })

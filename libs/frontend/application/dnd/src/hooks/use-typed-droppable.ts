import type { AnyData, Maybe } from '@codelab/shared-abstract-types'

import { useDroppable } from '@dnd-kit/core'

export const useTypedDroppable = <T extends Maybe<AnyData>>({
  data,
  ...rest
}: Omit<Parameters<typeof useDroppable>[0], 'data'> & {
  data?: T
}) => useDroppable({ data, ...rest })

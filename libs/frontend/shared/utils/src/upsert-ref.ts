import type { Nullish } from '@codelab/shared/abstract/types'

export const upsertRef = <T>(
  value: Nullish<{ id: Nullish<string> }>,
  ref: (id: string) => T,
  oldValue: T,
): T | null => (value && value.id ? ref(value.id) : value ? null : oldValue)

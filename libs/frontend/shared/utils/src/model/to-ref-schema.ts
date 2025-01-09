import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'

export function toRefSchema(ref: Ref<ObjectLike>): { id: string }
export function toRefSchema(ref: Ref<ObjectLike> | null): { id: string } | null

// For overloading
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions, func-style
export function toRefSchema(
  ref: Ref<ObjectLike> | null,
): { id: string } | null {
  return ref ? { id: ref.id } : null
}

import { Nullable } from '@codelab/shared/abstract/types'

export type CreateElementInput = {
  name?: Nullable<string>
  order?: number
  instanceOfComponentId?: Nullable<string>
  atomId?: Nullable<string>
  parentElementId?: string
  css?: string
  propsData?: string
}

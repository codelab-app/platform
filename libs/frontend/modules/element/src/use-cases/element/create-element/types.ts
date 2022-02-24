import { Nullable } from '@codelab/shared/abstract/types'

export type CreateElementInput = {
  name: Nullable<string>
  order: number
  componentId: Nullable<string>
  atomId: Nullable<string>
  parentElementId: string
}

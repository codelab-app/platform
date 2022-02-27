import { Nullable } from '@codelab/shared/abstract/types'

export type UpdateElementInput = {
  name: Nullable<string>
  instanceOfComponentId: Nullable<string>
  atomId: Nullable<string>
  renderForEachPropKey: Nullable<string>
  renderIfPropKey: Nullable<string>
}

import type {
  IEnumTypeValue,
  IEnumTypeValueDTO,
} from '@codelab/frontend/abstract/core'
import { detach, idProp, Model, model, prop, rootRef } from 'mobx-keystone'

const create = (fragment: IEnumTypeValueDTO) =>
  new EnumTypeValue({
    ...fragment,
    key: fragment.key,
  })

@model('@codelab/EnumTypeValue')
export class EnumTypeValue
  extends Model({
    id: idProp,
    key: prop<string>(),
    value: prop<string>(),
  })
  implements IEnumTypeValue
{
  get label() {
    return this.key
  }

  static create = create
}

export const enumTypeValueRef = rootRef<IEnumTypeValue>(
  '@codelab/EnumTypeValueRef',
  {
    onResolvedValueChange: (ref, newType, oldType) => {
      if (oldType && !newType) {
        detach(ref)
      }
    },
  },
)

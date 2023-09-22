import type { IEnumTypeValue } from '@codelab/frontend/abstract/core'
import type { IEnumTypeValueDTO } from '@codelab/shared/abstract/core'
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
  static create = create

  get label() {
    return this.key
  }
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

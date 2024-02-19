import type { IEnumTypeValue } from '@codelab/frontend/abstract/domain'
import type { IEnumTypeValueDto } from '@codelab/shared/abstract/core'
import { detach, idProp, Model, model, prop, rootRef } from 'mobx-keystone'

const create = (fragment: IEnumTypeValueDto) =>
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

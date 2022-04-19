import { IAnyType, IField, IFieldDTO } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'
import { typeRef } from './union-type.model'

@model('@codelab/Field')
export class Field
  extends Model(() => ({
    id: idProp, // this is a 'local' id, we don't use it in the backend. It's generated from the interfaceId + the key
    name: prop<Nullish<string>>(),
    description: prop<Nullish<string>>(),
    key: prop<string>(),
    type: prop<Ref<IAnyType>>(),
  }))
  implements IField
{
  public static fieldId(interfaceId: string, fieldKey: string) {
    return `${interfaceId}:fields:${fieldKey}`
  }

  @modelAction
  updateCache(fragment: IFieldDTO, interfaceId: string) {
    const target = fragment.node.id

    this.id = Field.fieldId(interfaceId, fragment.key)
    this.name = fragment.name
    this.description = fragment.description
    this.key = fragment.key
    this.type = typeRef(target)
  }

  @modelAction
  static hydrate(data: IFieldDTO) {
    const { id, key, name, description, node } = data

    return new Field({
      id,
      type: typeRef(node.id),
      name,
      description,
      key,
    })
  }
}

export const fieldRef = rootRef<Field>('@codelab/FieldRef', {
  onResolvedValueChange(ref, newType, oldType) {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})

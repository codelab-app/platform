import { IAnyType } from '@codelab/shared/abstract/core'
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
import {
  InterfaceTypeEdgeFragment,
  InterfaceTypeFieldEdgeFragment,
} from '../../graphql'
import { typeRef } from './union-type.model'

@model('codelab/Field')
export class Field extends Model(() => ({
  id: idProp, // this is a 'local' id, we don't use it in the backend. It's generated from the interfaceId + the key
  name: prop<Nullish<string>>(),
  description: prop<Nullish<string>>(),
  key: prop<string>(),
  type: prop<Ref<IAnyType>>(),
})) {
  public static fieldId(interfaceId: string, fieldKey: string) {
    return `${interfaceId}:fields:${fieldKey}`
  }

  @modelAction
  updateFromFragment(
    fragment: InterfaceTypeEdgeFragment | InterfaceTypeFieldEdgeFragment,
    interfaceId: string,
  ) {
    const target =
      (fragment as InterfaceTypeEdgeFragment).target ||
      (fragment as InterfaceTypeFieldEdgeFragment).node?.id

    this.id = Field.fieldId(interfaceId, fragment.key)
    this.name = fragment.name
    this.description = fragment.description
    this.key = fragment.key
    this.type = typeRef(target)
  }
}

export const fieldRef = rootRef<Field>('codealb/FieldRef', {
  onResolvedValueChange(ref, newType, oldType) {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})

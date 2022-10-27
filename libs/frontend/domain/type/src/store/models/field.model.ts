import {
  IAnyType,
  IField,
  IFieldDefaultValue,
  IFieldDTO,
  IInterfaceType,
  IValidationRules,
} from '@codelab/frontend/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
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

const hydrate = ({
  id,
  key,
  name,
  description,
  fieldType,
  api,
  validationRules,
  defaultValues,
}: IFieldDTO) =>
  new Field({
    id,
    name,
    description,
    key,
    type: typeRef(fieldType.id),
    api: typeRef(api.id) as Ref<IInterfaceType>,
    validationRules: JSON.parse(validationRules || '{}'),
    defaultValues: defaultValues ? JSON.parse(defaultValues) : null,
  })

@model('@codelab/Field')
export class Field
  extends Model(() => ({
    // this is a 'local' id, we don't use it in the backend. It's generated from the interfaceId + the key
    id: idProp,
    name: prop<Nullish<string>>(),
    description: prop<Nullish<string>>(),
    key: prop<string>(),
    type: prop<Ref<IAnyType>>(),
    validationRules: prop<Nullish<IValidationRules>>(),
    defaultValues: prop<Nullish<IFieldDefaultValue>>(null),
    api: prop<Ref<IInterfaceType>>(),
  }))
  implements IField
{
  @modelAction
  writeCache(fragment: IFieldDTO) {
    this.id = fragment.id
    this.name = fragment.name
    this.description = fragment.description
    this.key = fragment.key
    this.type = typeRef(fragment.fieldType.id)
    this.validationRules = JSON.parse(fragment.validationRules || '{}')
    this.defaultValues = fragment.defaultValues
      ? JSON.parse(fragment.defaultValues)
      : null

    return this
  }

  @modelAction
  static hydrate = hydrate

  // toString(options?: { withData?: boolean }) {
  //   return `\n{ ${this.key}: ${this.type.current.toString()} }`
  // }
}

export const fieldRef = rootRef<IField>('@codelab/FieldRef', {
  onResolvedValueChange(ref, newType, oldType) {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})

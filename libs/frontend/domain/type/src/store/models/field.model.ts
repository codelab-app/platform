import type {
  IAnyType,
  IField,
  IFieldDefaultValue,
  IInterfaceType,
  IValidationRules,
} from '@codelab/frontend/abstract/core'
import { IFieldDTO } from '@codelab/frontend/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  rootRef,
} from 'mobx-keystone'
import { typeRef } from './union-type.model'

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
  add(fragment: IFieldDTO) {
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
  writeCache({
    id,
    name,
    description,
    key,
    validationRules,
    fieldType,
    defaultValues,
  }: Partial<IFieldDTO>) {
    this.id = id ?? this.id
    this.name = name ?? this.name
    this.description = description ?? this.description
    this.key = key ?? this.key
    this.type = fieldType?.id ? typeRef(fieldType.id) : this.type
    this.validationRules = validationRules
      ? JSON.parse(validationRules || '{}')
      : this.validationRules
    this.defaultValues = defaultValues
      ? JSON.parse(defaultValues)
      : this.defaultValues

    return this
  }

  @modelAction
  static create({
    id,
    key,
    name,
    description,
    fieldType,
    api,
    validationRules,
    defaultValues,
  }: IFieldDTO) {
    return new Field({
      id,
      name,
      description,
      key,
      type: typeRef(fieldType.id),
      api: typeRef(api.id) as Ref<IInterfaceType>,
      validationRules: JSON.parse(validationRules || '{}'),
      defaultValues: defaultValues ? JSON.parse(defaultValues) : null,
    })
  }
}

// toString(options?: { withData?: boolean }) {
//   return `\n{ ${this.key}: ${this.type.current.toString()} }`
// }
export const fieldRef = rootRef<IField>('@codelab/FieldRef', {
  onResolvedValueChange: (ref, newType, oldType) => {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})

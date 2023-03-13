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

const create = ({
  api,
  defaultValues,
  description,
  fieldType,
  id,
  key,
  name,
  validationRules,
}: IFieldDTO) => {
  return new Field({
    api: typeRef(api.id) as Ref<IInterfaceType>,
    defaultValues: defaultValues ? JSON.parse(defaultValues) : null,
    description,
    id,
    key,
    name,
    type: typeRef(fieldType.id),
    validationRules: JSON.parse(validationRules || '{}'),
  })
}

@model('@codelab/Field')
export class Field
  extends Model(() => ({
    api: prop<Ref<IInterfaceType>>(),

    defaultValues: prop<Nullish<IFieldDefaultValue>>(null),

    description: prop<Nullish<string>>(),
    // this is a 'local' id, we don't use it in the backend. It's generated from the interfaceId + the key
    id: idProp,
    key: prop<string>(),
    name: prop<Nullish<string>>(),
    type: prop<Ref<IAnyType>>(),
    validationRules: prop<Nullish<IValidationRules>>(),
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

  static create = create

  @modelAction
  writeCache({
    defaultValues,
    description,
    fieldType,
    id,
    key,
    name,
    validationRules,
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

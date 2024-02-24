import type {
  IFieldDefaultValue,
  IInterfaceTypeModel,
  ITypeModel,
  IValidationRules,
} from '@codelab/frontend/abstract/domain'
import {
  fieldRef,
  IFieldModel,
  typeRef,
} from '@codelab/frontend/abstract/domain'
import type { FieldUpdateInput } from '@codelab/shared/abstract/codegen'
import { IFieldDto } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'
import isNil from 'lodash/isNil'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const create = ({
  api,
  defaultValues,
  description,
  fieldType,
  id,
  key,
  name,
  nextSibling,
  prevSibling,
  validationRules,
}: IFieldDto) => {
  let parsedDefaultValues = defaultValues

  try {
    // `defaultValues` could be a falsy valid value e.g. `false`, 0
    parsedDefaultValues = !isNil(parsedDefaultValues)
      ? JSON.parse(parsedDefaultValues)
      : null
  } catch (err) {
    console.log(`Failed to parse default value for field: ${key}`)
  }

  return new Field({
    api: typeRef(api.id) as Ref<IInterfaceTypeModel>,
    defaultValues: parsedDefaultValues,
    description,
    id,
    key,
    name,
    nextSibling: nextSibling?.id ? fieldRef(nextSibling.id) : undefined,
    prevSibling: prevSibling?.id ? fieldRef(prevSibling.id) : undefined,
    type: typeRef(fieldType.id),
    validationRules: JSON.parse(validationRules || '{}'),
  })
}

@model('@codelab/Field')
export class Field
  extends Model(() => ({
    api: prop<Ref<IInterfaceTypeModel>>(),
    defaultValues: prop<Nullish<IFieldDefaultValue>>(null),
    description: prop<Nullish<string>>(),
    // this is a 'local' id, we don't use it in the backend. It's generated from the interfaceId + the key
    id: idProp,
    key: prop<string>(),
    name: prop<Nullish<string>>(),
    nextSibling: prop<Nullish<Ref<IFieldModel>>>(null).withSetter(),
    prevSibling: prop<Nullish<Ref<IFieldModel>>>(null).withSetter(),
    type: prop<Ref<ITypeModel>>(),
    validationRules: prop<Nullish<IValidationRules>>(),
  }))
  implements IFieldModel
{
  static create = create

  @computed
  get toJson() {
    return {
      api: this.api,
      defaultValues: this.defaultValues,
      fieldType: this.type,
      id: this.id,
      key: this.key,
      name: this.name,
      nextSibling: this.nextSibling,
      prevSibling: this.prevSibling,
      type: this.type.current,
      validationRules: this.validationRules,
    }
  }

  @modelAction
  add(fragment: IFieldDto) {
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
  attachAsNextSibling(sibling: IFieldModel) {
    sibling.nextSibling = fieldRef(this)
    this.prevSibling = fieldRef(sibling)
  }

  @modelAction
  attachAsPrevSibling(sibling: IFieldModel) {
    sibling.prevSibling = fieldRef(this)
    this.nextSibling = fieldRef(sibling.id)
  }

  @modelAction
  changePrev(sibling: IFieldModel) {
    sibling.prevSibling = null
  }

  @modelAction
  connectPrevToNextSibling(): void {
    if (this.nextSibling) {
      this.nextSibling.current.prevSibling = this.prevSibling
        ? fieldRef(this.prevSibling.current)
        : null
    }

    if (this.prevSibling) {
      this.prevSibling.current.nextSibling = this.nextSibling
        ? fieldRef(this.nextSibling.current)
        : null
    }

    this.nextSibling = null
    this.prevSibling = null
  }

  @modelAction
  detachPrevSibling() {
    if (!this.prevSibling) {
      return
    }

    this.prevSibling = null
  }

  @modelAction
  writeCache({
    defaultValues,
    description,
    fieldType,
    id,
    key,
    name,
    nextSibling,
    prevSibling,
    validationRules,
  }: Partial<IFieldDto>) {
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
    this.nextSibling = nextSibling?.id
      ? fieldRef(nextSibling.id)
      : this.nextSibling
    this.prevSibling = prevSibling?.id
      ? fieldRef(prevSibling.id)
      : this.prevSibling

    return this
  }

  toCreateInput() {
    return {
      api: connectNodeId(this.api.id),
      defaultValues: JSON.stringify(this.defaultValues),
      description: this.description,
      fieldType: connectNodeId(this.type.id),
      id: this.id,
      key: this.key,
      name: this.name,
      validationRules: JSON.stringify(this.validationRules),
    }
  }

  toUpdateInput() {
    return {
      defaultValues: JSON.stringify(this.defaultValues),
      description: this.description,
      fieldType: reconnectNodeId(this.type.id),
      id: this.id,
      key: this.key,
      name: this.name,
      validationRules: JSON.stringify(this.validationRules),
    }
  }

  toUpdateNodesInput(): Pick<FieldUpdateInput, 'nextSibling' | 'prevSibling'> {
    return {
      nextSibling: reconnectNodeId(this.nextSibling?.id),
      prevSibling: reconnectNodeId(this.prevSibling?.id),
    }
  }
}

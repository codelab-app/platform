import type {
  IFieldDTO,
  IInterfaceType,
  IInterfaceTypeDTO,
} from '@codelab/frontend/abstract/core'
import { IField, IPropData, ITypeDTO } from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import merge from 'lodash/merge'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import {
  ExtendedModel,
  model,
  modelAction,
  objectMap,
  prop,
} from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { getFieldService } from '../field.service.context'
import { createBaseType } from './base-type.model'
import { fieldRef } from './field.model'

const hydrate = (type: IInterfaceTypeDTO): InterfaceType => {
  assertIsTypeKind(type.kind, ITypeKind.InterfaceType)

  const interfaceType = new InterfaceType({
    id: type.id,
    kind: type.kind,
    name: type.name,
    ownerId: type.owner.id,
  })

  return interfaceType
}

@model('@codelab/InterfaceType')
export class InterfaceType
  extends ExtendedModel(createBaseType(ITypeKind.InterfaceType), {
    _fields: prop(() => objectMap<Ref<IField>>()),
  })
  implements IInterfaceType
{
  @computed
  private get fieldService() {
    return getFieldService(this)
  }

  @computed
  get fields() {
    return [...this._fields.values()].map((field) => field.current)
  }

  @computed
  get defaultValues(): IPropData {
    return this.fields
      .map((field) => ({ [field.key]: field.defaultValues }))
      .reduce(merge, {})
  }

  field(id: string) {
    return this._fields.get(id)?.current
  }

  @modelAction
  deleteField(field: IField) {
    this._fields.delete(field.id)
  }

  @modelAction
  load(fields: Array<IFieldDTO>) {
    const fieldModels = fields.map(
      ({ id }) => this.fieldService.getField(id) as IField,
    )

    this._fields = objectMap(
      fieldModels.map((fieldModel) => [fieldModel.id, fieldRef(fieldModel)]),
    )
  }

  @modelAction
  writeFieldCache(fields: Array<IFieldDTO>) {
    for (const field of fields) {
      const fieldModel = this.fieldService.writeCache(field)
      this._fields.set(fieldModel.id, fieldRef(fieldModel))
    }
  }

  @modelAction
  writeCache(fragment: ITypeDTO) {
    if (fragment.__typename !== ITypeKind.InterfaceType) {
      throw new Error('Invalid InterfaceType')
    }

    updateBaseTypeCache(this, fragment)

    this.writeFieldCache(fragment.fields)

    // const newFieldsKeySet = new Set(this.fields.map((f) => f.key))
    //
    // for (const [key, field] of this.fields) {
    //   if (!newFieldsKeySet.has(key)) {
    //     this.fields.delete(field.id)
    //   }
    // }

    return this
  }

  public static hydrate = hydrate
}

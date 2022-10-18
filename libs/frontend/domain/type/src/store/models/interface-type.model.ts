import type {
  IField,
  IFieldDTO,
  IInterfaceType,
  IInterfaceTypeDTO,
  IPropData,
  ITypeDTO,
} from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  ExtendedModel,
  model,
  modelAction,
  objectMap,
  prop,
  Ref,
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
    ownerAuthId: type.owner.auth0Id,
    defaults: JSON.parse(type.ownerConnection.edges[0]?.data || '{}'),
  })

  return interfaceType
}

@model('@codelab/InterfaceType')
export class InterfaceType
  extends ExtendedModel(createBaseType(ITypeKind.InterfaceType), {
    _fields: prop(() => objectMap<Ref<IField>>()),
    ownerAuthId: prop<string>(),
    defaults: prop<IPropData>(),
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

  field(id: string) {
    return this._fields.get(id)?.current
  }

  @modelAction
  deleteField(field: IField) {
    this._fields.delete(field.id)
  }

  @modelAction
  writeFieldCache(fields: Array<IFieldDTO>) {
    for (const field of fields) {
      const fieldModel = this.fieldService.writeCache(field)
      console.log(fieldModel)
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

    this.defaults = JSON.parse(fragment.ownerConnection.edges[0]?.data || '{}')

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

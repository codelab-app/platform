import type {
  IApp,
  IFieldDTO,
  IInterfaceType,
} from '@codelab/frontend/abstract/core'
import {
  IField,
  IInterfaceTypeDTO,
  IPropData,
  ITypeDTO,
} from '@codelab/frontend/abstract/core'
import type { InterfaceTypeCreateInput } from '@codelab/shared/abstract/codegen'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'
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
import { v4 } from 'uuid'
import { updateBaseTypeCache } from '../base-type'
import { getFieldService } from '../field.service.context'
import { createBaseType } from './base-type.model'
import { fieldRef } from './field.model'

const hydrate = ({
  id,
  kind,
  name,
  owner,
}: IInterfaceTypeDTO): InterfaceType => {
  assertIsTypeKind(kind, ITypeKind.InterfaceType)

  const interfaceType = new InterfaceType({
    id,
    kind,
    name,
    owner,
  })

  return interfaceType
}

const createName = (name: string) => {
  return `${name} API`
}

const createApiNode = ({
  name,
  owner,
}: Pick<IApp, 'name' | 'owner'>): InterfaceTypeCreateInput => {
  return {
    id: v4(),
    kind: ITypeKind.InterfaceType,
    name: `${name} Store API`,
    owner: connectAuth0Owner(owner),
  }
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
      const fieldModel = this.fieldService.add(field)
      this._fields.set(fieldModel.id, fieldRef(fieldModel))
    }
  }

  @modelAction
  add(fragment: ITypeDTO) {
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

  static createName = createName

  toCreateInput(): InterfaceTypeCreateInput {
    return {
      id: this.id,
      kind: ITypeKind.InterfaceType,
      name: this.name,
      owner: connectAuth0Owner(this.owner),
    }
  }

  @modelAction
  writeCache(interfaceTypeDTO: IInterfaceTypeDTO) {
    updateBaseTypeCache(this, interfaceTypeDTO)

    return this
  }

  static hydrate = hydrate

  static createApiNode = createApiNode
}

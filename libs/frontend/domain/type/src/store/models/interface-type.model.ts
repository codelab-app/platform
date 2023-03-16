import type {
  IApp,
  IFieldDTO,
  IInterfaceType,
} from '@codelab/frontend/abstract/core'
import {
  IField,
  IInterfaceTypeDTO,
  IPropData,
} from '@codelab/frontend/abstract/core'
import type { InterfaceTypeCreateInput } from '@codelab/shared/abstract/codegen'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
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
import { getFieldService } from '../field.service.context'
import { createBaseType } from './base-type.model'
import { fieldRef } from './field.model'

const create = ({
  fields,
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

  interfaceType.writeFieldCache(fields)

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
  writeFieldCache(fields: Array<IEntity>) {
    for (const field of fields) {
      this._fields.set(field.id, fieldRef(field.id))
    }
  }

  @modelAction
  writeCache(interfaceTypeDTO: IInterfaceTypeDTO) {
    super.writeCache(interfaceTypeDTO)

    this.writeFieldCache(interfaceTypeDTO.fields)

    return this
  }

  static createName = createName

  static create = create

  static createApiNode = createApiNode
}

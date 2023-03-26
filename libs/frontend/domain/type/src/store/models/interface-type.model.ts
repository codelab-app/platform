import type {
  IApp,
  IField,
  IInterfaceType,
} from '@codelab/frontend/abstract/core'
import { IInterfaceTypeDTO, IPropData } from '@codelab/frontend/abstract/core'
import type { InterfaceTypeCreateInput } from '@codelab/shared/abstract/codegen'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'
import merge from 'lodash/merge'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { v4 } from 'uuid'
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
    _fields: fields.map((field) => fieldRef(field.id)),
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
    _fields: prop(() => Array<Ref<IField>>()),
  })
  implements IInterfaceType
{
  @computed
  get fields() {
    return this._fields.map((field) => field.current)
  }

  @computed
  get defaultValues(): IPropData {
    return this.fields
      .map((field) => ({ [field.key]: field.defaultValues }))
      .reduce(merge, {})
  }

  @modelAction
  writeCache(interfaceTypeDTO: IInterfaceTypeDTO) {
    super.writeCache(interfaceTypeDTO)

    return this
  }

  static createName = createName

  static create = create

  static createApiNode = createApiNode
}

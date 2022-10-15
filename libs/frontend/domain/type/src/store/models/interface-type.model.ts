import type {
  IField,
  IFieldDTO,
  IInterfaceType,
  IInterfaceTypeDTO,
  IPropData,
  ITypeDTO,
} from '@codelab/frontend/abstract/core'
import { Prop } from '@codelab/frontend/domain/prop'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  ExtendedModel,
  model,
  modelAction,
  objectMap,
  prop,
} from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createBaseType } from './base-type.model'
import { Field } from './field.model'

const hydrate = ({
  id,
  kind,
  name,
  fields,
  ownerConnection,
  owner,
}: IInterfaceTypeDTO): InterfaceType => {
  assertIsTypeKind(kind, ITypeKind.InterfaceType)

  const interfaceType = new InterfaceType({
    id,
    kind,
    name,
    ownerId: owner.id,
    ownerAuthId: owner.auth0Id,
    defaults: JSON.parse(ownerConnection.edges[0]?.data || '{}'),
  })

  for (const field of fields) {
    interfaceType.updateFieldCache(field)
  }

  return interfaceType
}

@model('@codelab/InterfaceType')
export class InterfaceType
  extends ExtendedModel(createBaseType(ITypeKind.InterfaceType), {
    fields: prop(() => objectMap<IField>()),
    ownerAuthId: prop<string>(),
    defaults: prop<IPropData>(),
  })
  implements IInterfaceType
{
  @computed
  get fieldList() {
    return [...this.fields.values()]
  }

  field(id: string) {
    return this.fields.get(id)
  }

  @modelAction
  updateFieldCache(fragment: IFieldDTO): Field {
    const propModel = Prop.hydrate(
      fragment.defaultValues ?? { id: '', data: '{}' },
    )

    const field = Field.hydrate(fragment)

    this.fields.set(field.id, field)

    return field
  }

  @modelAction
  deleteFieldLocal(field: IField) {
    this.fields.delete(field.id)
  }

  @modelAction
  writeCache(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    if (fragment.__typename !== ITypeKind.InterfaceType) {
      throw new Error('Invalid InterfaceType')
    }

    for (const field of fragment.fields) {
      let fieldModel = this.field(field.id)

      if (fieldModel) {
        fieldModel.writeCache(field)
      } else {
        fieldModel = this.updateFieldCache(field)
        this.fields.set(field.id, fieldModel)
      }
    }

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

import {
  assertIsTypeKind,
  ICreateFieldDTO,
  IInterfaceType,
  IInterfaceTypeDTO,
  IInterfaceTypeEdgeDTO,
  IInterfaceTypeFieldEdgeDTO,
  ITypeDTO,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  ExtendedModel,
  model,
  modelAction,
  objectMap,
  prop,
} from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createTypeBase } from './base-type.model'
import { Field } from './field.model'
import { typeRef } from './union-type.model'

const hydrate = ({
  id,
  kind,
  name,
  fieldsConnection,
  owner,
}: IInterfaceTypeDTO): InterfaceType => {
  assertIsTypeKind(kind, ITypeKind.InterfaceType)

  const interfaceType = new InterfaceType({
    id,
    kind,
    name,
    ownerId: owner?.id,
  })

  for (const edge of fieldsConnection.edges) {
    interfaceType.addFieldLocal(edge)
  }

  return interfaceType
}

@model('@codelab/InterfaceType')
export class InterfaceType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(ITypeKind.InterfaceType),
    props: {
      _fields: prop(() => objectMap<Field>()),
    },
  }))
  implements IInterfaceType
{
  @computed
  get fields(): Array<Field> {
    return Array.from(this._fields.values())
  }

  fieldByKey(key: string): Field | undefined {
    return this._fields.get(Field.fieldId(this.id, key))
  }

  @modelAction
  addFieldLocal({
    name,
    description,
    key,
    ...fragment
  }:
    | ICreateFieldDTO
    | IInterfaceTypeEdgeDTO
    | IInterfaceTypeFieldEdgeDTO): Field {
    this.validateUniqueFieldKey(key)

    const target =
      (fragment as IInterfaceTypeEdgeDTO).target ||
      (fragment as IInterfaceTypeFieldEdgeDTO).node?.id ||
      (fragment as ICreateFieldDTO).existingTypeId

    const field = new Field({
      id: Field.fieldId(this.id, key),
      type: typeRef(target),
      name,
      description,
      key,
    })

    this._fields.set(field.id, field)

    return field
  }

  @modelAction
  deleteFieldLocal(field: Field) {
    this._fields.delete(field.id)
  }

  @modelAction
  updateCache(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    if (fragment.__typename !== ITypeKind.InterfaceType) {
      return
    }

    for (const edge of fragment.fieldsConnection.edges) {
      let field = this.fieldByKey(edge.key)

      if (field) {
        field.hydrate(edge, this.id)
      } else {
        field = this.addFieldLocal(edge)
        this._fields.set(field.id, field)
      }
    }

    const newFieldsKeySet = new Set(this.fields.map((f) => f.key))

    for (const [key, field] of this._fields) {
      if (!newFieldsKeySet.has(key)) {
        this._fields.delete(field.id)
      }
    }
  }

  // @modelAction
  // override applyUpdateData(input: IUpdateTypeDTO) {
  //   super.applyUpdateData(input)
  // }

  validateUniqueFieldKey(key: string): void {
    if (this.fieldByKey(key)) {
      throw new Error(`Field with key ${key} already exists`)
    }
  }

  public static hydrate = hydrate
}

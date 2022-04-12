import {
  ICreateFieldDTO,
  IInterfaceType,
  IInterfaceTypeDTO,
  IInterfaceTypeEdgeDTO,
  IInterfaceTypeFieldEdgeDTO,
  ITypeDTO,
  IUpdateTypeDTO,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  ExtendedModel,
  model,
  modelAction,
  objectMap,
  prop,
} from 'mobx-keystone'
import { baseUpdateFromFragment } from '../abstract'
import { createTypeBase } from './base-type.model'
import { Field } from './field.model'
import { typeRef } from './union-type.model'

const fromFragment = ({
  id,
  typeKind,
  name,
  fieldsConnection,
  owner,
}: IInterfaceTypeDTO): InterfaceType => {
  const it = new InterfaceType({
    id,
    typeKind,
    name,
    ownerAuth0Id: owner?.auth0Id,
  })

  for (const edge of fieldsConnection.edges) {
    it.addFieldLocal(edge)
  }

  return it
}

@model('codelab/InterfaceType')
export class InterfaceType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(TypeKind.InterfaceType),
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
  updateFromFragment(fragment: ITypeDTO) {
    baseUpdateFromFragment(this, fragment)

    if (fragment.typeKind !== TypeKind.InterfaceType) {
      return
    }

    for (const edge of fragment.fieldsConnection.edges) {
      let field = this.fieldByKey(edge.key)

      if (field) {
        field.updateFromFragment(edge, this.id)
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

  @modelAction
  override applyUpdateData(input: IUpdateTypeDTO) {
    super.applyUpdateData(input)
  }

  validateUniqueFieldKey(key: string): void {
    if (this.fieldByKey(key)) {
      throw new Error(`Field with key ${key} already exists`)
    }
  }

  public static fromFragment = fromFragment
}

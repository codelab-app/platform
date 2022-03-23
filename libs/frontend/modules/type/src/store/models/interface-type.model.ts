import { TypeKind } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import {
  InterfaceTypeEdgeFragment,
  InterfaceTypeFieldEdgeFragment,
  InterfaceTypeFragment,
  TypeFragment,
} from '../../graphql'
import {
  baseTypeProps,
  baseUpdateFromFragment,
  IBaseType,
  makeUpdateFn,
} from '../abstract'
import { CreateFieldInput, Field } from './field.model';
import { typeRef } from './union-type.model'

@model('codelab/InterfaceType')
export class InterfaceType
  extends Model({
    ...baseTypeProps(TypeKind.InterfaceType),

    fields: prop(() => objectMap<Field>()),
  })
  implements IBaseType
{
  @computed
  get fieldsArray(): Array<Field> {
    return Array.from(this.fields.values())
  }

  fieldByKey(key: string): Field | undefined {
    return this.fields.get(Field.fieldId(this.id, key))
  }

  @modelFlow
  @transaction
  update = makeUpdateFn()

  @modelAction
  addFieldLocal({
    name,
    description,
    key,
    ...fragment
  }:
    | CreateFieldInput
    | InterfaceTypeEdgeFragment
    | InterfaceTypeFieldEdgeFragment): Field {
    this.validateUniqueFieldKey(key)

    const target =
      (fragment as InterfaceTypeEdgeFragment).target ||
      (fragment as InterfaceTypeFieldEdgeFragment).node?.id ||
      (fragment as CreateFieldInput).existingTypeId

    const field = new Field({
      id: Field.fieldId(this.id, key),
      type: typeRef(target),
      name,
      description,
      key,
    })

    this.fields.set(field.id, field)

    return field
  }

  @modelAction
  deleteFieldLocal(field: Field) {
    this.fields.delete(field.id)
  }

  @modelAction
  updateFromFragment(fragment: TypeFragment) {
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
        this.fields.set(field.id, field)
      }
    }

    const newFieldsKeySet = new Set(this.fieldsArray.map((f) => f.key))

    for (const [key, field] of this.fields) {
      if (!newFieldsKeySet.has(key)) {
        this.fields.delete(field.id)
      }
    }
  }

  validateUniqueFieldKey(key: string): void {
    if (this.fieldByKey(key)) {
      throw new Error(`Field with key ${key} already exists`)
    }
  }

  public static fromFragment({
    id,
    typeKind,
    name,
    fieldsConnection,
  }: InterfaceTypeFragment): InterfaceType {
    const it = new InterfaceType({ id, typeKind, name })

    for (const edge of fieldsConnection.edges) {
      it.addFieldLocal(edge)
    }

    return it
  }
}

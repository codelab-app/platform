import { CreateFieldInput as _CreateFieldInput } from '@codelab/shared/abstract/codegen'
import { TypeKind } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  Ref,
  rootRef,
  transaction,
} from 'mobx-keystone'
import {
  ArrayTypeFragment,
  InterfaceTypeEdgeFragment,
  InterfaceTypeFieldEdgeFragment,
  InterfaceTypeFragment,
  TypeFragment,
  UnionTypeFragment,
} from '../../graphql'
import {
  baseTypeProps,
  baseUpdateFromFragment,
  IBaseType,
  makeUpdateFn,
} from '../abstract'
import { AppType } from './AppType'
import { ElementType } from './ElementType'
import { EnumType } from './EnumType'
import { LambdaType } from './LambdaType'
import { MonacoType } from './MonacoType'
import { PageType } from './PageType'
import { PrimitiveType } from './PrimitiveType'
import { ReactNodeType } from './ReactNodeType'
import { RenderPropsType } from './RenderPropsType'

export type TypeModelAny =
  | AppType
  | LambdaType
  | PageType
  | RenderPropsType
  | PrimitiveType
  | ReactNodeType
  | MonacoType
  | ElementType
  | EnumType
  | UnionType
  | InterfaceType
  | ArrayType

//
// Types that reference other types.
// Putting them in the same file as it cause a circular dependency otherwise
//

///
/// Union
///
@model('codelab/UnionType')
export class UnionType
  extends Model({
    ...baseTypeProps(TypeKind.UnionType),

    typesOfUnionType: prop<Array<Ref<TypeModelAny>>>(() => []),
  })
  implements IBaseType
{
  @modelFlow
  @transaction
  update = makeUpdateFn()

  @modelAction
  updateFromFragment(fragment: TypeFragment): void {
    baseUpdateFromFragment(this, fragment)

    if (fragment.typeKind !== TypeKind.UnionType) {
      return
    }

    this.typesOfUnionType = fragment.typesOfUnionType.map((t) => typeRef(t.id))
  }

  public static fromFragment({
    id,
    typeKind,
    name,
    typesOfUnionType,
  }: UnionTypeFragment): UnionType {
    return new UnionType({
      id,
      typeKind,
      name,
      typesOfUnionType: typesOfUnionType.map((t) => typeRef(t.id)),
    })
  }
}

@model('codelab/Field')
export class Field extends Model(() => ({
  id: idProp, // this is a 'local' id, we don't use it in the backend. It's generated from the interfaceId + the key
  name: prop<Nullish<string>>(),
  description: prop<Nullish<string>>(),
  key: prop<string>(),
  type: prop<Ref<TypeModelAny>>(),
})) {
  public static fieldId(interfaceId: string, fieldKey: string) {
    return `${interfaceId}:fields:${fieldKey}`
  }

  @modelAction
  updateFromFragment(
    fragment: InterfaceTypeEdgeFragment | InterfaceTypeFieldEdgeFragment,
    interfaceId: string,
  ) {
    const target =
      (fragment as InterfaceTypeEdgeFragment).target ||
      (fragment as InterfaceTypeFieldEdgeFragment).node?.id

    this.id = Field.fieldId(interfaceId, fragment.key)
    this.name = fragment.name
    this.description = fragment.description
    this.key = fragment.key
    this.type = typeRef(target)
  }
}

export type CreateFieldInput = Omit<
  _CreateFieldInput,
  'type' | 'interfaceId'
> & { existingTypeId: string }

export type UpdateFieldInput = CreateFieldInput

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

@model('codelab/ArrayType')
export class ArrayType
  extends Model({
    ...baseTypeProps(TypeKind.ArrayType),

    itemType: prop<Nullish<Ref<TypeModelAny>>>(),
  })
  implements IBaseType
{
  @modelFlow
  @transaction
  update = makeUpdateFn()

  @modelAction
  updateFromFragment(fragment: TypeFragment) {
    baseUpdateFromFragment(this, fragment)

    if (fragment.typeKind !== TypeKind.ArrayType) {
      return
    }

    const itemId = fragment.itemType?.[0].id
    this.itemType = itemId ? typeRef(itemId) : null
  }

  static fromFragment(fragment: ArrayTypeFragment): ArrayType {
    const itemId = fragment.itemType?.[0].id
    const itemType = itemId ? typeRef(itemId) : null

    return new ArrayType({
      id: fragment.id,
      typeKind: fragment.typeKind,
      name: fragment.name,
      itemType,
    })
  }
}

export const typeRef = rootRef<TypeModelAny>('codelab/TypeRef', {
  onResolvedValueChange(ref, newType, oldType) {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})

export const fieldRef = rootRef<Field>('codealb/FieldRef', {
  onResolvedValueChange(ref, newType, oldType) {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})

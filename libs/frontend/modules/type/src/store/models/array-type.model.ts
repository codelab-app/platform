import { IAnyType, IArrayType, TypeKind } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { ExtendedModel, model, modelAction, prop, Ref } from 'mobx-keystone'
import { ArrayTypeFragment, TypeFragment } from '../../graphql'
import { baseUpdateFromFragment } from '../abstract'
import { createTypeBase } from './base-type.model'
import { typeRef } from './union-type.model'

@model('codelab/ArrayType')
export class ArrayType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(TypeKind.ArrayType),
    props: {
      itemType: prop<Nullish<Ref<IAnyType>>>(),
    },
  }))
  implements IArrayType
{
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

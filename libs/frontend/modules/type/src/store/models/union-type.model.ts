import { IAnyType, IUnionType, TypeKind } from '@codelab/shared/abstract/core'
import {
  detach,
  ExtendedModel,
  Model,
  model,
  modelAction,
  modelFlow,
  prop,
  Ref,
  rootRef,
  transaction,
} from 'mobx-keystone'
import { TypeFragment, UnionTypeFragment } from '../../graphql'
import { baseTypeProps, baseUpdateFromFragment, IBaseType } from '../abstract'
import { createTypeBase } from './base-type.model'

@model('codelab/UnionType')
export class UnionType
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(TypeKind.UnionType),
    props: {
      typesOfUnionType: prop<Array<Ref<IAnyType>>>(() => []),
    },
  }))
  implements IUnionType
{
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

export const typeRef = rootRef<IAnyType>('codelab/TypeRef', {
  onResolvedValueChange(ref, newType, oldType) {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})

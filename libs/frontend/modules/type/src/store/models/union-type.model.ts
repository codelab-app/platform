import { TypeKind } from '@codelab/shared/abstract/core'
import {
  detach,
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
import {
  baseTypeProps,
  baseUpdateFromFragment,
  IBaseType,
  makeUpdateFn,
} from '../abstract'
import type { AnyType } from './types'

//
// Union
//
@model('codelab/UnionType')
export class UnionType
  extends Model({
    ...baseTypeProps(TypeKind.UnionType),

    typesOfUnionType: prop<Array<Ref<AnyType>>>(() => []),
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

export const typeRef = rootRef<AnyType>('codelab/TypeRef', {
  onResolvedValueChange(ref, newType, oldType) {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})

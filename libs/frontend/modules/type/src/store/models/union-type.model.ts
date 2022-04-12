import {
  IAnyType,
  ITypeDTO,
  IUnionType,
  IUnionTypeDTO,
  IUpdateTypeDTO,
  TypeKind,
} from '@codelab/shared/abstract/core'
import {
  detach,
  ExtendedModel,
  model,
  modelAction,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'
import { baseUpdateFromFragment } from '../abstract'
import { createTypeBase } from './base-type.model'

const fromFragment = ({
  id,
  typeKind,
  name,
  typesOfUnionType,
  owner,
}: IUnionTypeDTO): UnionType =>
  new UnionType({
    id,
    typeKind,
    name,
    typesOfUnionType: typesOfUnionType.map((t) => typeRef(t.id)),
    ownerAuth0Id: owner?.auth0Id,
  })

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
  updateFromFragment(fragment: ITypeDTO): void {
    baseUpdateFromFragment(this, fragment)

    if (fragment.typeKind !== TypeKind.UnionType) {
      return
    }

    this.typesOfUnionType = fragment.typesOfUnionType.map((t) => typeRef(t.id))
  }

  @modelAction
  override applyUpdateData(input: IUpdateTypeDTO) {
    super.applyUpdateData(input)

    if (!input.typeIdsOfUnionType) {
      throw new Error('UnionType must have a typesOfUnionType array')
    }

    this.typesOfUnionType = input.typeIdsOfUnionType.map((tId) => typeRef(tId))
  }

  public static fromFragment = fromFragment
}

export const typeRef = rootRef<IAnyType>('codelab/TypeRef', {
  onResolvedValueChange(ref, newType, oldType) {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})

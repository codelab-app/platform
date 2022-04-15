import {
  IAnyType,
  ITypeDTO,
  IUnionType,
  IUnionTypeDTO,
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
import { updateBaseTypeCache } from '../base-type'
import { AnyType } from './any-type.model'
import { createTypeBase } from './base-type.model'

const hydrate = ({
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
    ownerId: owner?.id,
  })

@model('@codelab/UnionType')
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
  updateCache(fragment: ITypeDTO): void {
    updateBaseTypeCache(this, fragment)

    if (fragment.typeKind !== TypeKind.UnionType) {
      return
    }

    this.typesOfUnionType = fragment.typesOfUnionType.map((t) => typeRef(t.id))
  }

  // @modelAction
  // override applyUpdateData(input: IUpdateTypeDTO) {
  //   super.applyUpdateData(input)
  //
  //   if (!input.typeIdsOfUnionType) {
  //     throw new Error('UnionType must have a typesOfUnionType array')
  //   }
  //
  //   this.typesOfUnionType = input.typeIdsOfUnionType.map((tId) => typeRef(tId))
  // }

  public static hydrate = hydrate
}

export const typeRef = rootRef<AnyType>('@codelab/TypeRef', {
  onResolvedValueChange(ref, newType, oldType) {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})

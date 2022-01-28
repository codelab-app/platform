import { makeArrayDiffMutation } from '@codelab/backend/infra'
import { IType, TypeKind } from '@codelab/shared/abstract/core'
import { EntityLike } from '@codelab/shared/abstract/types'
import { Mutation } from 'dgraph-js-http'

export const getSingleTypeUnionTypes = (type: IType) => {
  return type.typeKind === TypeKind.UnionType ? type.typesOfUnionType : []
}

export const getUnionTypes = (oldType: IType, newType: IType) => {
  return [getSingleTypeUnionTypes(oldType), getSingleTypeUnionTypes(newType)]
}

export const unionTypeRelMutation = (
  type: IType,
  childTypeId: string,
): Mutation => ({
  setJson: { uid: type.id, typesOfUnionType: { uid: childTypeId } },
})

export const unionTypeRelDeleteMutation = (
  type: IType,
  childTypeId: string,
): Mutation => ({
  deleteJson: { uid: type.id, typesOfUnionType: { uid: childTypeId } },
})

export const unionTypesDiffMutation = (
  oldUnionTypes: Array<EntityLike>,
  newUnionTypes: Array<EntityLike>,
  parentType: IType,
) => {
  return makeArrayDiffMutation(oldUnionTypes, newUnionTypes, {
    forCreate: (t) => unionTypeRelMutation(parentType, t.id),
    // Do not update the union types themselves, they are a different aggregate than the parent Union type
    forUpdate: () => ({}),
    forDelete: (t) => unionTypeRelDeleteMutation(parentType, t.id),
  })
}

import {
  makeArrayDiffMutation,
  mergeMutations,
  randomBlankNode,
} from '@codelab/backend/infra'
import { IEnumTypeValue, IType, TypeKind } from '@codelab/shared/abstract/core'
import { Maybe, WithOrder } from '@codelab/shared/abstract/types'
import { Mutation } from 'dgraph-js-http'
import { EnumTypeValueMutationFactory } from '../../enum-type-value/enum-type-value-mutation.factory'

export const getSingleTypeAllowedValues = (type: IType) => {
  return type.typeKind === TypeKind.EnumType ? type.allowedValues : []
}

export const getAllowedValues = (oldType: IType, newType: IType) => {
  return [
    getSingleTypeAllowedValues(oldType),
    getSingleTypeAllowedValues(newType),
  ]
}

export const allowedValuesRelMutation = (
  type: IType,
  enumValueId: string,
): Mutation => ({
  setJson: { uid: type.id, allowedValues: { uid: enumValueId } },
})

export const allowedValuesRelDeleteMutation = (
  type: IType,
  enumValueId: string,
): Mutation => ({
  deleteJson: { uid: type.id, allowedValues: { uid: enumValueId } },
})

// Returns mutation for creating/deleting/updating fields as necessary to match the newly provided ones
export const allowedValuesDiffMutation = (
  oldValues: Array<IEnumTypeValue & WithOrder>,
  newValues: Array<IEnumTypeValue & WithOrder>,
  parentType: IType,
  mutationFactory: EnumTypeValueMutationFactory,
): Maybe<Mutation> => {
  if (parentType.typeKind !== TypeKind.EnumType) {
    return undefined
  }

  newValues = newValues.map((f, i) => ({ ...f, order: i }))

  const forCreate = (etv: IEnumTypeValue) => {
    const etvId = randomBlankNode()
    const relCreate: Mutation = allowedValuesRelMutation(parentType, etvId)
    const baseCreate = mutationFactory.forCreate(etv, etvId)

    return mergeMutations(baseCreate, relCreate)
  }

  const forUpdate = (etv: IEnumTypeValue, oldEtv: IEnumTypeValue) => {
    return mutationFactory.forUpdate(etv, oldEtv)
  }

  const forDelete = (etv: IEnumTypeValue) => {
    const baseDelete = mutationFactory.forDelete(etv)

    const relDelete: Mutation = allowedValuesRelDeleteMutation(
      parentType,
      etv.id,
    )

    return mergeMutations(baseDelete, relDelete)
  }

  return makeArrayDiffMutation(oldValues, newValues, {
    forCreate,
    forUpdate,
    forDelete,
  })
}

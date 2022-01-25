import {
  makeArrayDiffMutation,
  mergeMutations,
  randomBlankNode,
} from '@codelab/backend/infra'
import { IField, IType, TypeKind } from '@codelab/shared/abstract/core'
import { Maybe, WithOrder } from '@codelab/shared/abstract/types'
import { Mutation } from 'dgraph-js-http'
import { FieldMutationFactory } from '../../field/field-mutation.factory'

export const getSingleTypeFields = (type: IType) =>
  type.typeKind === TypeKind.InterfaceType ? type.fields : []

export const getTypeFields = (oldType: IType, newType: IType) => {
  return [getSingleTypeFields(oldType), getSingleTypeFields(newType)]
}

export const fieldRelMutation = (type: IType, fieldId: string): Mutation => ({
  setJson: { uid: type.id, fields: { uid: fieldId } },
})

export const fieldRelDeleteMutation = (
  type: IType,
  fieldId: string,
): Mutation => ({
  deleteJson: { uid: type.id, fields: { uid: fieldId } },
})

// Returns mutation for creating/deleting/updating fields as necessary to match the newly provided ones
export const fieldsDiffMutation = (
  oldFields: Array<IField & WithOrder>,
  newFields: Array<IField & WithOrder>,
  parentType: IType,
  fieldMutationFactory: FieldMutationFactory,
): Maybe<Mutation> => {
  if (parentType.typeKind !== TypeKind.InterfaceType) {
    return undefined
  }

  newFields.forEach((f, i) => (f.order = i))

  const forCreate = (field: IField) => {
    const fieldId = randomBlankNode()
    const relCreate: Mutation = fieldRelMutation(parentType, fieldId)
    const baseCreate = fieldMutationFactory.forCreate(field, fieldId)

    return mergeMutations(baseCreate, relCreate)
  }

  const forUpdate = (field: IField, oldField: IField) => {
    return fieldMutationFactory.forUpdate(field, oldField)
  }

  const forDelete = (field: IField) => {
    const baseDelete = fieldMutationFactory.forDelete(field)
    const relDelete: Mutation = fieldRelDeleteMutation(parentType, field.id)

    return mergeMutations(baseDelete, relDelete)
  }

  return makeArrayDiffMutation(oldFields, newFields, {
    forCreate,
    forUpdate,
    forDelete,
  })
}

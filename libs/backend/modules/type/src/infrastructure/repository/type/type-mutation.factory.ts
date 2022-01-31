import { DgraphEntityType } from '@codelab/backend/abstract/core'
import {
  BaseMutationFactory,
  makeDeleteJsonMutationForUpdates,
  mergeMutations,
  NullablePredicates,
  randomBlankNode,
} from '@codelab/backend/infra'
import {
  IEnumTypeValue,
  IField,
  IType,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { Mutation } from 'dgraph-js-http'
import { EnumTypeValueMutationFactory } from '../enum-type-value/enum-type-value-mutation.factory'
import { FieldMutationFactory } from '../field/field-mutation.factory'
import {
  allowedValuesDiffMutation,
  getAllowedValues,
  getSingleTypeAllowedValues,
} from './mutation-helpers/allowed-values-diff-mutation'
import {
  coreBasePredicates,
  getTypeSpecificPredicates,
} from './mutation-helpers/core-type-predicates'
import {
  fieldsDiffMutation,
  getSingleTypeFields,
  getTypeFields,
} from './mutation-helpers/fields-diff-mutations'
import {
  getSingleTypeUnionTypes,
  getUnionTypes,
  unionTypesDiffMutation,
} from './mutation-helpers/union-types-diff-mutation'

/**
 * Factory for creating mutations for Type entities
 *
 * Note: this is not designed to handle updating a typeKind
 */
export class TypeMutationFactory extends BaseMutationFactory<IType> {
  public readonly entityType = DgraphEntityType.Type

  // Add nullable/optional predicates of any type here
  public readonly nullablePredicates: NullablePredicates<IType> = []

  static readonly TypeNullables: NullablePredicates<IType>

  private readonly fieldMutationFactory = new FieldMutationFactory()

  private readonly etvMutationFactory = new EnumTypeValueMutationFactory()

  /**
   * Converts a IType entity to a dgraph mutation
   * Does NOT include array relationships, like fields, allowedValues and typesOfUnionType
   * */
  protected coreMutation(type: IType, uid?: string): Mutation {
    const base = coreBasePredicates(type, uid ?? randomBlankNode())
    const specific = getTypeSpecificPredicates(type)

    return { setJson: { ...base, ...specific } }
  }

  forCreate(entity: IType, uid?: string): Mutation {
    uid = uid || randomBlankNode()
    entity = { ...entity, id: uid }

    const core = this.coreMutation(entity, uid)
    // Handle the array relationships, because they are not included in the core mutation
    const fields: Array<IField> = getSingleTypeFields(entity)

    const fieldMutation = fieldsDiffMutation(
      [],
      fields,
      entity,
      this.fieldMutationFactory,
    )

    const typesOfUnionType = getSingleTypeUnionTypes(entity)

    const typesOfUnionTypeMutation = unionTypesDiffMutation(
      [],
      typesOfUnionType,
      entity,
    )

    // All the allowedValues mutations, because the coreMutation doesn't include them
    const allowedValues: Array<IEnumTypeValue> =
      getSingleTypeAllowedValues(entity)

    const allowedValueMutation = allowedValuesDiffMutation(
      [],
      allowedValues,
      entity,
      this.etvMutationFactory,
    )

    return mergeMutations(
      core,
      fieldMutation,
      allowedValueMutation,
      typesOfUnionTypeMutation,
    )
  }

  /**
   * Creates a mutation for updating a Type, its Fields and EnumTypeValues
   */
  forUpdate(entity: IType, oldEntity: IType): Mutation {
    if (!entity.id) {
      throw new Error(`Type can't be updated without id`)
    }

    if (entity.typeKind !== oldEntity.typeKind) {
      // This is not handled, if needed - update this method with the required implementation
      throw new Error(`Type can't be updated to a different typeKind`)
    }

    // The base update mutation, which updates the Type's predicates
    const coreUpdateMutation: Mutation = this.coreMutation(entity, entity.id)

    // Deletes all nullable predicates which are set to null/undefined
    // because if we use just {setJson: {somePredicate: null}}, they will stay
    const deleteNullPredicatesMutation = makeDeleteJsonMutationForUpdates(
      entity,
      entity.id,
      TypeMutationFactory.TypeNullables,
    )

    // Handle the array relationships, because they are not included in the core mutation
    const [oldFields, newFields] = getTypeFields(oldEntity, entity)

    const fieldsMutation = fieldsDiffMutation(
      oldFields,
      newFields,
      entity,
      this.fieldMutationFactory,
    )

    const [oldAllowedValues, newAllowedValues] = getAllowedValues(
      oldEntity,
      entity,
    )

    const allowedValuesMutation = allowedValuesDiffMutation(
      oldAllowedValues,
      newAllowedValues,
      entity,
      this.etvMutationFactory,
    )

    const [unionTypes, newUnionTypes] = getUnionTypes(oldEntity, entity)

    const unionTypesMutation = unionTypesDiffMutation(
      unionTypes,
      newUnionTypes,
      entity,
    )

    return mergeMutations(
      coreUpdateMutation,
      deleteNullPredicatesMutation,
      fieldsMutation,
      allowedValuesMutation,
      unionTypesMutation,
    )
  }

  /**
   * Creates a mutation to delete a Type, its Fields and EnumTypeValues
   */
  forDelete(entity: IType): Mutation {
    if (!entity.id) {
      throw new Error(`${this.entityType} can't be deleted without id`)
    }

    const coreDelete = { deleteJson: { uid: entity.id } }
    const relDeletes: Array<Mutation> = []

    const fields =
      entity.typeKind === TypeKind.InterfaceType ? entity.fields : []

    relDeletes.push(
      ...fields.map((field) => this.fieldMutationFactory.forDelete(field)),
    )

    const allowedValues =
      entity.typeKind === TypeKind.EnumType ? entity.allowedValues : []

    relDeletes.push(
      ...allowedValues.map((av) => this.etvMutationFactory.forDelete(av)),
    )

    return mergeMutations(coreDelete, ...relDeletes)
  }
}

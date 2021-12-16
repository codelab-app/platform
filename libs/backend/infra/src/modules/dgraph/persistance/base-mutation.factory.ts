import { Mutation } from 'dgraph-js-http'
import { DgraphRepository } from '../dgraph.repository'
import { DgraphEntityType } from '../dgraph-entity-type'
import {
  makeDeleteJsonMutationForUpdates,
  NullablePredicates,
} from '../utils/makeDeleteJsonMutationForUpdates'
import { mergeMutations } from '../utils/mergeMutations'
import { IMutationFactory } from './mutation-factory.interface'

/**
 * Provides boilerplate for a base set of dgraph mutations and serves as example of integrating a repository with dgraph mutations
 * Override any methods you need to customize.
 * Or add new ones if new mutations are needed.
 *
 * {@see NullablePredicates} for how to construct the predicate array
 */
export class BaseMutationFactory<T extends { id?: string | null }>
  implements IMutationFactory<T>
{
  constructor(
    public readonly entityType: DgraphEntityType,
    protected readonly nullablePredicates: NullablePredicates<T>,
  ) {}

  /**
   * Override this method if the entity has different predicates keys
   *
   * E.g.:
   * entity: {somePropId: string}, dgraph schema: {someProp: {uid: string}} -> Override me
   * entity: {someProp: {uid: string}}, dgraph schema: {someProp: {uid: string}} -> No need to override, all keys are the same
   * */
  forCreate(entity: T, uid?: string): Mutation {
    const { id, ...data } = entity // removes the id property from the data we put in dgraph

    return {
      setJson: {
        uid: uid || DgraphRepository.randomBlankNode(),
        'dgraph.type': this.entityType,
        ...data,
      },
    }
  }

  /**
   * Override this method to update related entities or if the forCreate is overridden with custom keys.
   *
   * If forCreate is overridden with custom keys, which don't match the dgraph schema, this won't work properly,
   * since it relies on the entity to match the dgraph schema for makeDeleteJsonMutationForUpdates to work
   *
   * Override this method if there are any 1-M relationships
   * */
  forUpdate(entity: T, oldEntity: T): Mutation {
    if (!entity.id) {
      throw new Error(`${this.entityType} can't be updated without id`)
    }

    const setMutation = this.forCreate(entity, entity.id)

    // Delete all nullable predicates explicitly set to null,
    // because if we use just {setJson: {somePredicate: null}}, they will stay
    const deleteMutation = makeDeleteJsonMutationForUpdates(
      entity,
      entity.id,
      this.nullablePredicates,
    )

    return mergeMutations(setMutation, deleteMutation)
  }

  /** Override this method to delete related entities */
  forDelete(entity: T): Mutation {
    if (!entity.id) {
      throw new Error(`${this.entityType} can't be deleted without id`)
    }

    return { deleteJson: { uid: entity.id } }
  }
}

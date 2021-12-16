import { Mutation } from 'dgraph-js-http'

export interface IMutationFactory<T> {
  forCreate(entity: T, uid?: string): Mutation
  forUpdate(entity: T, oldEntity: T): Mutation
  forDelete(entity: T): Mutation
}

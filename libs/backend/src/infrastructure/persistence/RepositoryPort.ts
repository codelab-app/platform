import { AggregateRoot } from '../../core/domain'

export interface RepositoryPort<T extends AggregateRoot> {
  // Switched to transactional repository

  create(...args: any): Promise<T>
  // delete(...args: any): Promise<Option<T>>
  // findOne(...args: any): Promise<Option<T>>
  // findMany(...args: any): Promise<Array<T>>
}

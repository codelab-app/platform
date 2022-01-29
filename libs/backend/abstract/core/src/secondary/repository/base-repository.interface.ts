import { Maybe } from '@codelab/shared/abstract/types'
import { CreateResponsePort } from '../../primary'
import { ITransaction } from '../dgraph'

export interface IBaseRepository<T>
  extends IReadRepository<T>,
    IWriteRepository<T> {}

export interface IReadRepository<T> {
  getOne(id: string, transaction: ITransaction): Promise<Maybe<T>>
  getAll(transaction: ITransaction): Promise<Array<T>>
  getAllByIds(ids: Array<string>, transaction: ITransaction): Promise<Array<T>>
}
export interface IWriteRepository<T> {
  create(entity: T, transaction: ITransaction): Promise<CreateResponsePort>
  createAll(
    entities: Array<T>,
    transaction: ITransaction,
  ): Promise<Array<CreateResponsePort>>
  update(updatedEntity: T, transaction: ITransaction): Promise<void>
  delete(id: string, transaction: ITransaction): Promise<void>
  deleteAll(ids: Array<string>, transaction: ITransaction): Promise<void>
}

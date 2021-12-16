import { CreateResponsePort } from '@codelab/backend/abstract/core'
import { ITransaction } from '../transaction-manager'

export interface IWriteRepository<T> {
  create(entity: T, transaction: ITransaction): Promise<CreateResponsePort>
  update(updatedEntity: T, transaction: ITransaction): Promise<void>
  delete(id: string, transaction: ITransaction): Promise<void>
  deleteAll(ids: Array<string>, transaction: ITransaction): Promise<void>
}

export interface IReadRepository<T> {
  getOne(id: string, transaction: ITransaction): Promise<T | undefined>
  getAll(transaction: ITransaction): Promise<Array<T>>
  getAllByIds(ids: Array<string>, transaction: ITransaction): Promise<Array<T>>
}

export interface IBaseRepository<T>
  extends IWriteRepository<T>,
    IReadRepository<T> {}

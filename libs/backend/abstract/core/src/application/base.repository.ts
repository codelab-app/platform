import { ITransaction } from '@codelab/backend/infra'
import { CreateResponsePort } from '../primary'

export interface IBaseRepository<T> {
  save(entity: T, transaction: ITransaction): Promise<CreateResponsePort>
}

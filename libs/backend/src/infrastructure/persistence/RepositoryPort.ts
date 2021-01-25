import { Option } from 'fp-ts/Option'

export interface RepositoryPort<T> {
  create: (...args: any) => Promise<Option<T>>
  delete: (...args: any) => Promise<Option<T>>
  update: (...args: any) => Promise<Option<T>>
  findOne: (...args: any) => Promise<Option<T>>
  findMany?: (...args: any) => Promise<Array<T>>
}

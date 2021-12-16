import { v4 } from 'uuid'
import { CreateResponsePort } from '../primary'
import { IBaseRepository } from './base.repository'

export class InMemoryRepository<T> implements IBaseRepository<T> {
  private data: Array<T> = []

  async save(entity: T): Promise<CreateResponsePort> {
    this.data.push(entity)

    return {
      id: v4(),
    }
  }
}

import { CreateResponsePort } from '@codelab/backend/abstract/core'
import { Injectable } from '@nestjs/common'
import { IBaseRepository } from './base-repository.interface'

@Injectable()
export class InMemoryRepository<T extends { id?: string | null }>
  implements IBaseRepository<T>
{
  protected generateId(): string {
    // to emulate dgraph as much as possible, use hex ids
    const id = this.counter++

    return `0x${id.toString(16)}`
  }

  protected counter = 0

  protected data: Array<T> = []

  async create(entity: T): Promise<CreateResponsePort> {
    const id = (entity.id = this.generateId())
    this.data.push(entity)

    return { id }
  }

  async getAll(): Promise<Array<T>> {
    return [...this.data]
  }

  async getAllByIds(ids: Array<string>): Promise<Array<T>> {
    const all = await this.getAll()
    const idsSet = new Set(ids)

    return all.filter((entity) => entity.id && idsSet.has(entity.id))
  }

  async getOne(id: string): Promise<T | undefined> {
    return this.data.find((entity) => entity.id === id)
  }

  async update(updatedEntity: T): Promise<void> {
    const index = this.data.findIndex(
      (entity) => entity.id === updatedEntity.id,
    )

    if (index === -1) {
      throw new Error('Entity not found')
    }

    this.data[index] = updatedEntity
  }

  async delete(id: string): Promise<void> {
    const index = this.data.findIndex((entity) => entity.id === id)

    if (index === -1) {
      throw new Error('Entity not found')
    }

    this.data.splice(index, 1)
  }

  async deleteAll(ids: Array<string>): Promise<void> {
    await Promise.all(ids.map((id) => this.delete(id)))
  }
}

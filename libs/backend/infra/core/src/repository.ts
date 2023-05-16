import type { IRepository } from '@codelab/backend/abstract/types'
import type { IEntity } from '@codelab/shared/abstract/types'
import { TTLCache } from '@codelab/shared/utils'

export abstract class AbstractRepository<
  Model extends IEntity,
  ModelData,
  Where extends { id?: string | null },
> implements IRepository<Model, ModelData, Where>
{
  private findOneCache: TTLCache<string, ModelData | undefined>

  private findCache: TTLCache<string, Array<ModelData>>

  // Set default TTL to 60 seconds
  constructor(ttl = 60000) {
    this.findOneCache = new TTLCache<string, ModelData | undefined>(ttl)
    this.findCache = new TTLCache<string, Array<ModelData>>(ttl)
  }

  async findOne(where: Where): Promise<ModelData | undefined> {
    const cacheKey = JSON.stringify(where)
    const cachedValue = this.findOneCache.get(cacheKey)

    if (cachedValue !== undefined) {
      return cachedValue
    }

    const result = (await this.find(where))[0]
    this.findOneCache.set(cacheKey, result)

    return result
  }

  async find(where?: Where): Promise<Array<ModelData>> {
    const cacheKey = JSON.stringify(where)
    const cachedValue = this.findCache.get(cacheKey)

    if (cachedValue !== undefined) {
      return cachedValue
    }

    const results = await this._find(where)
    this.findCache.set(cacheKey, results)

    return results
  }

  protected abstract _find(where?: Where): Promise<Array<ModelData>>

  public add(data: Array<Model>): Promise<Array<ModelData>> {
    console.debug(`Adding ${this.constructor.name}`, data)

    return this._add(data)
  }

  protected abstract _add(data: Array<Model>): Promise<Array<ModelData>>

  /**
   * We disallow updating of ID, since it disallows us from keying a where search by name, and having consistent ID.
   *
   * Say we created some DTO data that is keyed by name, but with a generated ID. After finding existing record and performing update, we will actually update the ID as we ll.
   */
  async update(data: Model, where: Where): Promise<ModelData> {
    console.debug(`Updating ${this.constructor.name}`, data, { where })

    const model = await this._update(data, where)

    if (!model) {
      throw new Error('Model not updated')
    }

    return model
  }

  protected abstract _update(
    data: Model,
    where: Where,
  ): Promise<ModelData | undefined>

  /**
   * Upsert behavior, uses data id by default for upsert. If `where` clause is specified, then it overrides id
   *
   * @param where
   */
  async save(data: Model, where?: Where): Promise<ModelData> {
    const computedWhere = this.getWhere(data, where)

    if (await this.exists(data, computedWhere)) {
      return this.update(data, computedWhere)
    }

    const results = (await this.add([data]))[0]

    if (!results) {
      throw new Error('Save failed')
    }

    return results
  }

  async exists(data: Model, where: Where) {
    const results = await this.findOne(where)

    console.debug('Checking Exists: ', this.constructor, {
      data,
      results,
      where,
    })

    return Boolean(results)
  }

  /**
   * Specifying a `where` clause overrides the  id
   */
  private getWhere(data: Model, where?: Where) {
    return where ? where : ({ id: data.id } as Where)
  }
}

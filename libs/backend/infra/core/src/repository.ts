import type { IRepository } from '@codelab/backend/abstract/types'
import { flattenWithPrefix } from '@codelab/backend/infra/adapter/otel'
import type { IEntity } from '@codelab/shared/abstract/types'
import { withTracing } from '@codelab/shared/infra/otel'
import { CacheInstance, CacheService } from '@shared/infra/cache'

export abstract class AbstractRepository<
  Model extends IEntity,
  ModelData extends object,
  Where extends { id?: string | null },
> implements IRepository<Model, ModelData, Where>
{
  private cacheService: CacheService

  private enableCache = false

  private ttl: number

  // Set default TTL to 60 seconds
  constructor(ttl = 60000) {
    this.cacheService = CacheService.getInstance(CacheInstance.Backend)
    this.ttl = ttl
  }

  async findOne(where: Where): Promise<ModelData | undefined> {
    if (!this.enableCache) {
      return (await this.find(where))[0]
    }

    const cachedValue = await this.cacheService.getOne<ModelData>(
      this.constructor.name,
      where,
    )

    if (cachedValue !== null) {
      return cachedValue
    }

    const result = (await this.find(where))[0]

    if (result !== undefined) {
      await this.cacheService.setOne(this.constructor.name, where, result)
    }

    return result
  }

  async find(where?: Where): Promise<Array<ModelData>> {
    if (!this.enableCache) {
      return await this._find(where)
    }

    const cachedValue = await this.cacheService.getMany<ModelData>(
      this.constructor.name,
      where,
    )

    if (cachedValue !== null) {
      return cachedValue
    }

    const results = await this._find(where)

    await this.cacheService.setMany(this.constructor.name, where, results)

    return results
  }

  protected abstract _find(where?: Where): Promise<Array<ModelData>>

  public async add(data: Array<Model>): Promise<Array<ModelData>> {
    return await withTracing(
      `${this.constructor.name}.add()`,
      async () => {
        // await this.cacheService.clearCache(this.constructor.name)

        return this._add(data)
      },
      (span) => {
        const attributes = flattenWithPrefix(data[0] ?? {}, 'data')
        span.setAttributes(attributes)
      },
    )()
  }

  protected abstract _add(data: Array<Model>): Promise<Array<ModelData>>

  /**
   * We disallow updating of ID, since it disallows us from keying a where search by name, and having consistent ID.
   *
   * Say we created some DTO data that is keyed by name, but with a generated ID. After finding existing record and performing update, we will actually update the ID as we ll.
   */
  async update(data: Model, where: Where): Promise<ModelData> {
    const model = await withTracing(
      `${this.constructor.name}.update()`,
      async () => {
        // await CacheService.getInstance(CacheInstance.Backend).clearAllCache()
        // await CacheService.getInstance(CacheInstance.Backend).clearCache(
        //   this.constructor.name,
        //   where,
        // )

        return this._update(data, where)
      },
      (span) => {
        const dataAttributes = flattenWithPrefix(data, 'data')
        const whereAttributes = flattenWithPrefix(data, 'where')
        span.setAttributes(dataAttributes)
        span.setAttributes(whereAttributes)
      },
    )()

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
    // Only some models have name
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modelData: any = data

    return await withTracing(
      `${this.constructor.name}.save() ${modelData.name ?? ''}`,
      async () => {
        const computedWhere = this.getWhere(data, where)

        if (await this.exists(data, computedWhere)) {
          return await this.update(data, computedWhere)
        }

        const results = (await this.add([data]))[0]

        if (!results) {
          throw new Error('Save failed')
        }

        return results
      },
    )()
  }

  async exists(data: Model, where: Where) {
    return withTracing(
      `${this.constructor.name}.exists()`,
      async (span) => {
        const results = await this.findOne(where)
        const exists = Boolean(results)

        span.addEvent('exists', { exists })

        return exists
      },
      (span) => {
        const dataAttributes = flattenWithPrefix(data, 'data')
        const whereAttributes = flattenWithPrefix(where, 'where')
        span.setAttributes(dataAttributes)
        span.setAttributes(whereAttributes)
      },
    )()
  }

  /**
   * Specifying a `where` clause overrides the  id
   */
  private getWhere(data: Model, where?: Where) {
    return where ? where : ({ id: data.id } as Where)
  }

  // protected abstract getTracerName: string
}

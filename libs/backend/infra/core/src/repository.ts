import type { IRepository } from '@codelab/backend/abstract/types'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { CacheService } from '@codelab/shared/infra/cache'
import { CacheInstance } from '@codelab/shared/infra/cache'
import { flattenWithPrefix, withActiveSpan } from '@codelab/shared/infra/otel'
import { Injectable } from '@nestjs/common'
import { context } from '@opentelemetry/api'

@Injectable()
export abstract class AbstractRepository<
  Model extends IEntity,
  ModelData extends object,
  Where extends { id?: string | null },
  Options,
> implements IRepository<Model, ModelData, Where>
{
  // private cacheService: CacheService

  // private enableCache = false

  // private ttl = 60000

  constructor(protected traceService: TraceService) {
    // this.cacheService = CacheService.getInstance(CacheInstance.Backend)
  }

  async findOne(where: Where): Promise<ModelData | undefined> {
    // Don't use decorator since it doesn't give us the right name
    return withActiveSpan(
      `${this.constructor.name}.findOne`,
      async (span) => {
        span.setAttributes(flattenWithPrefix(where, 'where'))

        // if (!this.enableCache) {
        //   return (await this.find({ where }))[0]
        // }

        // const cachedValue = await this.cacheService.getOne<ModelData>(
        //   this.constructor.name,
        //   where,
        // )

        // if (cachedValue !== null) {
        //   return cachedValue
        // }

        const result = (await this.find({ where }))[0]

        if (!result) {
          return undefined
        }

        // await this.cacheService.setOne(this.constructor.name, where, result)

        span.setAttributes(flattenWithPrefix(result))

        return result
      },
      // context.active(),
    )
  }

  async find({
    options,
    where,
  }: {
    where?: Where
    options?: Options
  } = {}): Promise<Array<ModelData>> {
    return withActiveSpan(
      `${this.constructor.name}.find`,
      async (span) => {
        span.setAttributes(flattenWithPrefix(where, 'where'))

        // if (!this.enableCache) {
        //   return await this._find({ options, where })
        // }

        // const cachedValue = await this.cacheService.getMany<ModelData>(
        //   this.constructor.name,
        //   where,
        // )

        // if (cachedValue !== null) {
        //   return cachedValue
        // }

        const results = await this._find({ options, where })

        span.addEvent('Result', flattenWithPrefix(results))

        // await this.cacheService.setMany(this.constructor.name, where, results)

        return results
      },
      // context.active(),
    )
  }

  protected abstract _find({
    options,
    where,
  }: {
    where?: Where
    options?: Options
  }): Promise<Array<ModelData>>

  public async add(data: Array<Model>): Promise<Array<ModelData>> {
    const span = this.traceService.getSpan()
    const attributes = flattenWithPrefix(data[0] ?? {}, 'data')
    span?.setAttributes(attributes)

    // await this.cacheService.clearCache(this.constructor.name)
    return this._add(data)
  }

  protected abstract _add(data: Array<Model>): Promise<Array<ModelData>>

  /**
   * We disallow updating of ID, since it disallows us from keying a where search by name, and having consistent ID.
   *
   * Say we created some DTO data that is keyed by name, but with a generated ID. After finding existing record and performing update, we will actually update the ID as we ll.
   */
  async update(data: Model, where?: Where): Promise<ModelData> {
    return withActiveSpan(
      `${this.constructor.name}.update`,
      async (span) => {
        const dataAttributes = flattenWithPrefix(data, 'data')
        const whereAttributes = flattenWithPrefix(data, 'where')
        span.setAttributes(dataAttributes)
        span.setAttributes(whereAttributes)

        // await CacheService.getInstance(CacheInstance.Backend).clearAllCache()
        // await CacheService.getInstance(CacheInstance.Backend).clearCache(
        //   this.constructor.name,
        //   where,
        // )

        const model = await this._update(data, where)

        if (!model) {
          throw new Error('Model not updated')
        }

        return model
      },
      // context.active(),
    )
  }

  protected abstract _update(
    data: Model,
    where?: Where,
  ): Promise<ModelData | undefined>

  /**
   * Upsert behavior, uses data id by default for upsert. If `where` clause is specified, then it overrides id
   *
   * @param where
   */
  async save(data: Model, where?: Where): Promise<ModelData> {
    return withActiveSpan(
      `${this.constructor.name}.save`,
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
      // context.active(),
    )
  }

  async exists(data: Model, where: Where) {
    return withActiveSpan(
      `${this.constructor.name}.exists`,
      async (span) => {
        const results = await this.findOne(where)
        const exists = Boolean(results)

        // Spans
        span.setAttributes(flattenWithPrefix(where, 'where'))
        span.setAttributes(flattenWithPrefix(data, 'data'))
        span.addEvent('Exists', { exists })

        return exists
      },
      // context.active(),
    )
  }

  /**
   * Specifying a `where` clause overrides the  id
   */
  private getWhere(data: Model, where?: Where) {
    return where ? where : ({ id: data.id } as Where)
  }
}

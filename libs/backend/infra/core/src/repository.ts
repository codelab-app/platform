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
  constructor(protected traceService: TraceService) {}

  async findOne(where: Where): Promise<ModelData | undefined> {
    const result = (await this.find({ where }))[0]

    if (!result) {
      return undefined
    }

    return result
  }

  async find({
    options,
    where,
  }: {
    where?: Where
    options?: Options
  } = {}): Promise<Array<ModelData>> {
    const results = await this._find({ options, where })

    return results
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
    const model = await this._update(data, where)

    if (!model) {
      throw new Error('Model not updated')
    }

    return model
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
    const computedWhere = this.getWhere(data, where)

    if (
      await context.with(context.active(), () =>
        this.exists(data, computedWhere),
      )
    ) {
      return await this.update(data, computedWhere)
    }

    const results = (await this.add([data]))[0]

    if (!results) {
      throw new Error('Save failed')
    }

    return results
  }

  async exists(data: Model, where: Where) {
    return withActiveSpan(`${this.constructor.name}.exists`, async (span) => {
      const results = await this.findOne(where)
      const exists = Boolean(results)

      // Spans
      span.setAttributes(flattenWithPrefix(where, 'where'))
      span.setAttributes(flattenWithPrefix(data, 'data'))
      span.addEvent('Exists', { exists })

      return exists
    })
  }

  /**
   * Specifying a `where` clause overrides the  id
   */
  private getWhere(data: Model, where?: Where) {
    return where ? where : ({ id: data.id } as Where)
  }
}

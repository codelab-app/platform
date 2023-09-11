import type { IRepository } from '@codelab/backend/abstract/types'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { type IEntity } from '@codelab/shared/abstract/types'
import { flattenWithPrefix, withActiveSpan } from '@codelab/shared/infra/otel'
import { Injectable } from '@nestjs/common'
import type { Static, TAnySchema, TSchema } from '@sinclair/typebox'

@Injectable()
export abstract class AbstractRepository<
  Model extends IEntity,
  ModelData extends object,
  Where extends { id?: string | null },
  Options,
> implements IRepository<Model, ModelData, Where, Options>
{
  constructor(
    protected traceService: TraceService,
    protected validationService: ValidationService,
  ) {}

  /**
   *
   * @param where
   * @param schema optional schema to validate the return data
   * @returns
   */
  async findOne<T extends TAnySchema>(
    where: Where,
    schema?: T,
  ): Promise<ModelData | Static<T> | undefined> {
    // Don't use decorator since it doesn't give us the right name
    return withActiveSpan(`${this.constructor.name}.findOne`, async (span) => {
      this.traceService.addJsonAttributes('where', where)

      // So overload works
      const results = schema
        ? (await this.find({ where }, schema))[0]
        : (await this.find({ where }))[0]

      if (!results) {
        return undefined
      }

      this.traceService.addJsonAttributes('results', results)

      if (schema) {
        return this.validationService.validateAndClean(schema, results)
      }

      return results
    })
  }

  find(args: { where?: Where; options?: Options }): Promise<Array<ModelData>>

  find<T extends TAnySchema>(
    args: {
      where?: Where
      options?: Options
    },
    schema: T,
  ): Promise<Array<Static<T>>>

  /**
   *
   * @param param0
   * @param schema This is the singular form of the schema
   * @returns
   */
  async find<T extends TAnySchema>(
    {
      options,
      where,
    }: {
      where?: Where
      options?: Options
    } = {},
    schema?: T,
  ): Promise<Array<ModelData> | Array<Static<T>>> {
    return withActiveSpan(`${this.constructor.name}.find`, async (span) => {
      this.traceService.addJsonAttributes('where', where)

      const results = await this._find({ options, where })

      this.traceService.addJsonAttributes('results', results)

      if (schema) {
        const data = results.map((result) => {
          return this.validationService.validateAndClean(schema, result)
        })

        return data
      }

      return results
    })
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

    return this._add(data)
  }

  protected abstract _add(data: Array<Model>): Promise<Array<ModelData>>

  /**
   * We disallow updating of ID, since it disallows us from keying a where search by name, and having consistent ID.
   *
   * Say we created some DTO data that is keyed by name, but with a generated ID. After finding existing record and performing update, we will actually update the ID as we ll.
   */
  async update(data: Model, where?: Where): Promise<ModelData> {
    return withActiveSpan(`${this.constructor.name}.update`, async (span) => {
      const dataAttributes = flattenWithPrefix(data, 'data')
      const whereAttributes = flattenWithPrefix(data, 'where')
      span.setAttributes(dataAttributes)
      span.setAttributes(whereAttributes)

      const model = await this._update(data, where)

      if (!model) {
        throw new Error('Model not updated')
      }

      return model
    })
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      `${this.constructor.name}.save ${(data as any)?.['name']}`,
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
    )
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

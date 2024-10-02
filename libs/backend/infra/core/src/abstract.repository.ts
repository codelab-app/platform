import type { IRepository } from '@codelab/backend/abstract/types'
import type { IRef } from '@codelab/shared/abstract/core'
import type { Static, TAnySchema } from '@sinclair/typebox'

import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { NotFoundError } from '@codelab/shared/domain'
import { Injectable } from '@nestjs/common'

@Injectable()
export abstract class AbstractRepository<
  Model extends IRef,
  ModelData extends IRef,
  Where extends { id?: string | null },
  Options,
> implements IRepository<Model, ModelData, Where, Options>
{
  constructor(
    protected validationService: ValidationService,
    protected loggerService: CodelabLoggerService,
  ) {}

  /**
   * Array adds complexity, create an optional `addMany` if needed
   */
  public async add(data: Model): Promise<ModelData> {
    console.log('add', data)
    this.loggerService.log(data, `${this.constructor.name}.add()`)

    const results = await this._addMany([data])
    const result = results[0]

    if (!result) {
      throw new Error('Add failed')
    }

    return result
  }

  public async addMany(data: Array<Model>): Promise<Array<ModelData>> {
    return this._addMany(data)
  }

  async exists(where: Where) {
    const results = await this.findOne({ where })
    const exists = Boolean(results)

    return exists
  }

  find(args?: { where?: Where; options?: Options }): Promise<Array<ModelData>>

  find<T extends TAnySchema>(args?: {
    where?: Where
    options?: Options
    schema: T
    selectionSet?: string
  }): Promise<Array<Static<T>>>

  /**
   *
   * @param param0
   * @param schema This is the singular form of the schema
   * @returns
   */
  async find<T extends TAnySchema>({
    options,
    schema,
    selectionSet,
    where,
  }: {
    where?: Where
    options?: Options
    selectionSet?: string
    schema?: T
  } = {}): Promise<Array<ModelData> | Array<Static<T>>> {
    const results = await this._find({ options, selectionSet, where })

    if (schema) {
      const data = results.map((result) => {
        return this.validationService.validateAndClean(schema, result)
      })

      return data
    }

    return results
  }

  async findOne(args?: {
    where: Where
    options?: Options
  }): Promise<ModelData | undefined>

  async findOne<T extends TAnySchema>(args?: {
    where: Where
    options?: Options
    selectionSet?: string
    schema?: T
  }): Promise<Static<T> | undefined>

  /**
   *
   * @param where
   * @param schema optional schema to validate the return data
   * @returns
   */
  async findOne<T extends TAnySchema>({
    options,
    schema,
    selectionSet,
    where,
  }: {
    where: Where
    schema?: T
    selectionSet?: string
    options: Options
  }): Promise<ModelData | Static<T> | undefined> {
    // Don't use decorator since it doesn't give us the right name

    // So overload works
    const results = schema
      ? (await this.find({ schema, where }))[0]
      : (await this.find({ where }))[0]

    if (!results) {
      return undefined
    }

    if (schema) {
      return this.validationService.validateAndClean(schema, results)
    }

    return results
  }

  async findOneOrFail(args?: {
    where: Where
    options?: Options
  }): Promise<ModelData>

  async findOneOrFail<T extends TAnySchema>(args?: {
    where: Where
    options?: Options
    selectionSet?: string
    schema?: T
  }): Promise<Static<T>>

  async findOneOrFail<T extends TAnySchema>({
    options,
    schema,
    selectionSet,
    where,
  }: {
    where: Where
    schema?: T
    selectionSet?: string
    options: Options
  }): Promise<ModelData | Static<T>> {
    const found = await this.findOne({ options, schema, selectionSet, where })

    if (!found) {
      throw new NotFoundError('Could not find item!', {
        where,
      })
    }

    return found
  }

  /**
   * Upsert behavior, uses data id by default for upsert. If `where` clause is specified, then it overrides id
   *
   * @param where
   */
  async save(data: Model, where?: Where): Promise<ModelData> {
    const computedWhere = this.getWhere(data, where)

    if (await this.exists(computedWhere)) {
      return await this.update(data, computedWhere)
    }

    const results = await this.add(data)

    return results
  }

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

  protected abstract _addMany(data: Array<Model>): Promise<Array<ModelData>>

  protected abstract _find({
    options,
    selectionSet,
    where,
  }: {
    where?: Where
    options?: Options
    selectionSet?: string
  }): Promise<Array<ModelData>>

  protected abstract _update(
    data: Model,
    where?: Where,
  ): Promise<ModelData | undefined>

  /**
   * Specifying a `where` clause overrides the  id
   */
  private getWhere(data: Model, where?: Where) {
    return where ? where : ({ id: data.id } as Where)
  }
}

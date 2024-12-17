import type { IRepository } from '@codelab/backend/abstract/types'
import type { IRef } from '@codelab/shared/abstract/core'
import type { Static, TAnySchema } from '@sinclair/typebox'

import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { NotFoundError } from '@codelab/shared/domain/errors'
import { Injectable } from '@nestjs/common'

@Injectable()
export abstract class AbstractRepository<
  Dto extends IRef,
  Model extends IRef,
  Where extends { id?: string | null },
  Options,
> implements IRepository<Dto, Model, Where, Options>
{
  constructor(
    protected validationService: ValidationService,
    protected loggerService: CodelabLoggerService,
  ) {}

  /**
   * Array adds complexity, create an optional `addMany` if needed
   */
  public async add(data: Dto): Promise<IRef> {
    if (this.DEBUG) {
      console.log(`${this.constructor.name}.add`, data)

      this.loggerService.log(data, `${this.constructor.name}.add()`)
    }

    const results = await this._addMany([data])
    const result = results[0]

    if (!result) {
      throw new Error('Add failed')
    }

    return result
  }

  public async addMany(data: Array<Dto>): Promise<Array<IRef>> {
    return this._addMany(data)
  }

  async exists(where: Where) {
    if (this.DEBUG) {
      console.log('Exists', where)
    }

    const results = await this.findOne({ where })
    const exists = Boolean(results)

    return exists
  }

  find(args?: { where?: Where; options?: Options }): Promise<Array<Model>>

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
  } = {}): Promise<Array<Model> | Array<Static<T>>> {
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
  }): Promise<Model | undefined>

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
  }): Promise<Model | Static<T> | undefined> {
    if (this.DEBUG) {
      console.log('Find one', where)
    }
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

    console.log('Returning results...')

    return results
  }

  async findOneOrFail(args?: {
    where: Where
    options?: Options
  }): Promise<Model>

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
  }): Promise<Model | Static<T>> {
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
  async save(data: Dto, where?: Where): Promise<IRef> {
    if (this.DEBUG) {
      console.log('save', data)
    }

    const computedWhere = this.getWhere(data, where)

    if (await this.exists(computedWhere)) {
      if (this.DEBUG) {
        console.log('exists! updating...')
      }

      return await this.update(data, computedWhere)
    }

    if (this.DEBUG) {
      console.log('Not exist, adding...')
    }

    const results = await this.add(data)

    return results
  }

  /**
   * We disallow updating of ID, since it disallows us from keying a where search by name, and having consistent ID.
   *
   * Say we created some DTO data that is keyed by name, but with a generated ID. After finding existing record and performing update, we will actually update the ID as we ll.
   */
  async update(data: Dto, where?: Where): Promise<IRef> {
    if (this.DEBUG) {
      console.log('update', data, where)
    }

    const computedWhere = this.getWhere(data, where)
    const existing = await this.findOne({ where: computedWhere })
    const model = await this._update(data, where, existing)

    if (!model) {
      throw new Error('Model not updated')
    }

    return model
  }

  protected abstract _addMany(data: Array<Dto>): Promise<Array<IRef>>

  protected abstract _find({
    options,
    selectionSet,
    where,
  }: {
    where?: Where
    options?: Options
    selectionSet?: string
  }): Promise<Array<Model>>

  protected abstract _update(
    data: Dto,
    where?: Where,
    existing?: Model,
  ): Promise<IRef | undefined>

  private DEBUG = true

  /**
   * Specifying a `where` clause overrides the  id
   */
  private getWhere(data: Dto, where?: Where) {
    return where ? where : ({ id: data.id } as Where)
  }
}

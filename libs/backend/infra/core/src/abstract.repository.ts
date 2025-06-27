import type { IRepository } from '@codelab/backend-abstract-types'
import type { IDiscriminatedRef, IRef } from '@codelab/shared-abstract-core'
import type { Static, TAnySchema } from '@sinclair/typebox'

import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { NotFoundError } from '@codelab/shared-domain-errors'
import { Validator } from '@codelab/shared-infra-typebox'
import { kebabCase } from '@codelab/shared-utils'
import { Injectable } from '@nestjs/common'
import { chunk } from 'remeda'

@Injectable()
export abstract class AbstractRepository<
  INodeType extends string,
  Dto extends IRef,
  Model extends IRef,
  Where extends { id?: string | null },
  Options,
> implements IRepository<Dto, Model, Where, Options>
{
  constructor(protected loggerService: PinoLoggerService) {}

  /**
   * Array adds complexity, create an optional `addMany` if needed
   */
  public async add(data: Dto): Promise<IDiscriminatedRef<INodeType>> {
    try {
      const addItem = async () => {
        const results = await this._addMany([data])
        const result = results[0]

        if (!result) {
          throw new Error('Add failed')
        }

        return result
      }

      return await this.loggerService.verboseWithTiming(
        'Adding item',
        addItem,
        {
          context: this.getNamespace('add'),
          data: {
            data,
          },
        },
      )
    } catch (error) {
      this.loggerService.error('Failed to add item', {
        context: this.getNamespace('add'),
        data: {
          data,
          error,
        },
      })
      throw error
    }
  }

  public async addMany(
    data: Array<Dto>,
  ): Promise<Array<IDiscriminatedRef<INodeType>>> {
    try {
      const BATCH_SIZE = 3
      const batches = chunk(data, BATCH_SIZE)

      this.loggerService.debug('Processing data in batches', {
        batchCount: batches.length,
        batchSize: BATCH_SIZE,
        context: this.getNamespace('addMany'),
        totalItems: data.length,
      })

      // Process each batch and combine results
      const results: Array<IDiscriminatedRef<INodeType>> = []

      for (const [i, batch] of batches.entries()) {
        this.loggerService.debug(
          `Processing batch (${i + 1}/${batches.length})`,
          {
            context: this.getNamespace('addMany'),
          },
        )

        const batchResults = await this._addMany(batch)

        results.push(...batchResults)
      }

      return results
    } catch (error) {
      this.loggerService.error('Failed to add items', {
        context: this.getNamespace('addMany'),
        data: {
          data,
          error,
        },
      })
      throw error
    }
  }

  async exists(where: Where) {
    this.loggerService.verbose('Checking if exists', {
      context: this.getNamespace('exists'),
      data: {
        where,
      },
    })

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
    try {
      const results = await this._find({ options, selectionSet, where })

      if (schema) {
        const data = results.map((result) => {
          return Validator.parse(schema, result)
        })

        return data
      }

      return results
    } catch (error) {
      this.loggerService.verbose('Failed to find items', {
        context: this.getNamespace('find'),
        data: {
          error,
          options,
          where,
        },
      })
      throw error
    }
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
    this.loggerService.verbose('Finding one', {
      context: this.getNamespace('findOne'),
      data: {
        where,
      },
    })

    const results = schema
      ? (await this.find({ schema, where }))[0]
      : (await this.find({ where }))[0]

    this.loggerService.verbose('Found result', {
      context: this.getNamespace('findOne'),
      data: {
        exists: Boolean(results),
      },
    })

    if (!results) {
      return undefined
    }

    if (schema) {
      return Validator.parse(schema, results)
    }

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
  async save(data: Dto, where?: Where): Promise<IDiscriminatedRef<INodeType>> {
    try {
      const computedWhere = this.getWhere(data, where)

      if (await this.exists(computedWhere)) {
        this.loggerService.verbose('Record exists, updating...', {
          context: this.getNamespace('save'),
        })

        return await this.update(data, computedWhere)
      }

      this.loggerService.verbose('Record does not exist, adding...', {
        context: this.getNamespace('save'),
      })

      return await this.add(data)
    } catch (error) {
      this.loggerService.error('Failed to save item', {
        context: this.getNamespace('save'),
        data: {
          data,
          error,
          where,
        },
      })
      throw error
    }
  }

  /**
   * We disallow updating of ID, since it disallows us from keying a where search by name, and having consistent ID.
   *
   * Say we created some DTO data that is keyed by name, but with a generated ID. After finding existing record and performing update, we will actually update the ID as we ll.
   */
  async update(
    data: Dto,
    where?: Where,
  ): Promise<IDiscriminatedRef<INodeType>> {
    this.loggerService.verbose('Updating data', {
      context: this.getNamespace('update'),
      data: {
        data,
        where,
      },
    })

    const computedWhere = this.getWhere(data, where)
    const existing = await this.findOne({ where: computedWhere })

    try {
      const model = await this._update(data, where, existing)

      if (!model) {
        throw new Error('Model not updated')
      }

      return model
    } catch (error) {
      this.loggerService.error('Failed to update item', {
        context: this.getNamespace('update'),
        data: {
          data,
          error,
          existing,
          where,
        },
      })
      throw error
    }
  }

  protected abstract _addMany(
    data: Array<Dto>,
  ): Promise<Array<IDiscriminatedRef<INodeType>>>

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
  ): Promise<IDiscriminatedRef<INodeType> | undefined>

  protected getNamespace(operation?: string): string {
    // Extract entity name from class name
    const className = this.constructor.name
    // Remove 'Repository' suffix and convert to kebab-case
    const entityName = kebabCase(className.replace(/Repository$/, ''))
    const base = `repository:${entityName}`

    return operation ? `${base}:${operation}` : base
  }

  /**
   * Specifying a `where` clause overrides the  id
   */
  private getWhere(data: Dto, where?: Where) {
    return where ? where : ({ id: data.id } as Where)
  }
}

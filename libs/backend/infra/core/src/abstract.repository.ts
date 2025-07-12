import type { IRepository } from '@codelab/backend-abstract-types'
import type { IDiscriminatedRef, IRef } from '@codelab/shared-abstract-core'
import type { Static, TAnySchema } from '@sinclair/typebox'

import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { NotFoundError } from '@codelab/shared-domain-errors'
import { Validator } from '@codelab/shared-infra-typebox'
import { kebabCase } from '@codelab/shared-utils'
import { Injectable } from '@nestjs/common'

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

      return await this.loggerService.debugWithTiming('Adding item', addItem, {
        context: this.getNamespace('add'),
        data: {
          data,
        },
      })
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
      const addManyItems = async () => {
        return await this._addMany(data)
      }

      return await this.loggerService.debugWithTiming(
        'Adding multiple items',
        addManyItems,
        {
          context: this.getNamespace('addMany'),
          data: {
            itemCount: data.length,
          },
        },
      )
    } catch (error) {
      this.loggerService.error('Failed to add multiple items', {
        context: this.getNamespace('addMany'),
        data: {
          error,
          itemCount: data.length,
        },
      })
      throw error
    }
  }

  async exists(where: Where) {
    const startTime = Date.now()
    const namespace = this.getNamespace('exists')
    
    this.loggerService.debug('Checking if exists - START', {
      context: namespace,
      data: {
        where,
        whereKeys: Object.keys(where || {}),
        timestamp: new Date().toISOString(),
      },
    })

    try {
      // This triggers _find through findOne
      const results = await this.findOne({ where })
      const exists = Boolean(results)
      const duration = Date.now() - startTime

      this.loggerService.debug('Checking if exists - COMPLETE', {
        context: namespace,
        data: {
          exists,
          duration,
          where,
        },
      })

      return exists
    } catch (error) {
      const duration = Date.now() - startTime
      
      this.loggerService.error('Checking if exists - FAILED', {
        context: namespace,
        data: {
          duration,
          error,
          where,
        },
      })
      
      throw error
    }
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
    const startTime = Date.now()
    const namespace = this.getNamespace('find')
    
    this.loggerService.debug('Find operation - START', {
      context: namespace,
      data: {
        hasSchema: Boolean(schema),
        hasSelectionSet: Boolean(selectionSet),
        options,
        timestamp: new Date().toISOString(),
        where,
        whereKeys: Object.keys(where || {}),
      },
    })

    try {
      // This calls the abstract _find method implemented by subclasses
      const results = await this._find({ options, selectionSet, where })
      const duration = Date.now() - startTime

      this.loggerService.debug('Find operation - COMPLETE', {
        context: namespace,
        data: {
          duration,
          resultCount: results.length,
          where,
        },
      })

      if (schema) {
        const data = results.map((result) => {
          return Validator.parse(schema, result)
        })

        return data
      }

      return results
    } catch (error) {
      const duration = Date.now() - startTime
      
      this.loggerService.error('Find operation - FAILED', {
        context: namespace,
        data: {
          duration,
          error,
          errorMessage: error instanceof Error ? error.message : String(error),
          errorStack: error instanceof Error ? error.stack : undefined,
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
    const startTime = Date.now()
    const namespace = this.getNamespace('findOne')
    const callStack = new Error().stack
    
    this.loggerService.debug('FindOne operation - START', {
      context: namespace,
      data: {
        callStack: callStack?.split('\n').slice(2, 5).join(' <- '),
        hasSchema: Boolean(schema),
        timestamp: new Date().toISOString(),
        where,
        whereKeys: Object.keys(where || {}),
      },
    })

    try {
      // This triggers find() which then calls _find()
      const results = schema
        ? (await this.find({ schema, where }))[0]
        : (await this.find({ where }))[0]

      const duration = Date.now() - startTime

      this.loggerService.debug('FindOne operation - COMPLETE', {
        context: namespace,
        data: {
          duration,
          found: Boolean(results),
          where,
        },
      })

      if (!results) {
        return undefined
      }

      if (schema) {
        return Validator.parse(schema, results)
      }

      return results
    } catch (error) {
      const duration = Date.now() - startTime
      
      this.loggerService.error('FindOne operation - FAILED', {
        context: namespace,
        data: {
          duration,
          error,
          errorMessage: error instanceof Error ? error.message : String(error),
          where,
        },
      })
      
      throw error
    }
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
    const startTime = Date.now()
    const namespace = this.getNamespace('save')
    
    try {
      const computedWhere = this.getWhere(data, where)
      
      this.loggerService.debug('Save operation - START', {
        context: namespace,
        data: {
          computedWhere,
          dataId: data.id,
          timestamp: new Date().toISOString(),
          where,
        },
      })

      // This calls exists() which triggers findOne() -> find() -> _find()
      const existsCheckStart = Date.now()
      const recordExists = await this.exists(computedWhere)
      const existsCheckDuration = Date.now() - existsCheckStart
      
      this.loggerService.debug('Save operation - EXISTS CHECK COMPLETE', {
        context: namespace,
        data: {
          existsCheckDuration,
          recordExists,
        },
      })

      if (recordExists) {
        this.loggerService.debug('Record exists, updating...', {
          context: namespace,
          data: {
            computedWhere,
          },
        })

        const result = await this.update(data, computedWhere)
        const totalDuration = Date.now() - startTime
        
        this.loggerService.debug('Save operation - UPDATE COMPLETE', {
          context: namespace,
          data: {
            totalDuration,
          },
        })
        
        return result
      }

      this.loggerService.debug('Record does not exist, adding...', {
        context: namespace,
        data: {
          dataId: data.id,
        },
      })

      const result = await this.add(data)
      const totalDuration = Date.now() - startTime
      
      this.loggerService.debug('Save operation - ADD COMPLETE', {
        context: namespace,
        data: {
          totalDuration,
        },
      })
      
      return result
    } catch (error) {
      const duration = Date.now() - startTime
      
      this.loggerService.error('Save operation - FAILED', {
        context: namespace,
        data: {
          data,
          duration,
          error,
          errorMessage: error instanceof Error ? error.message : String(error),
          errorStack: error instanceof Error ? error.stack : undefined,
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
    const startTime = Date.now()
    const namespace = this.getNamespace('update')
    
    this.loggerService.debug('Update operation - START', {
      context: namespace,
      data: {
        dataId: data.id,
        timestamp: new Date().toISOString(),
        where,
      },
    })

    const computedWhere = this.getWhere(data, where)
    
    try {
      // This triggers findOne() -> find() -> _find()
      const findStart = Date.now()
      const existing = await this.findOne({ where: computedWhere })
      const findDuration = Date.now() - findStart
      
      this.loggerService.debug('Update operation - FIND EXISTING COMPLETE', {
        context: namespace,
        data: {
          existingFound: Boolean(existing),
          findDuration,
        },
      })

      const updateStart = Date.now()
      const model = await this._update(data, where, existing)
      const updateDuration = Date.now() - updateStart

      if (!model) {
        throw new Error('Model not updated')
      }

      const totalDuration = Date.now() - startTime
      
      this.loggerService.debug('Update operation - COMPLETE', {
        context: namespace,
        data: {
          totalDuration,
          updateDuration,
        },
      })

      return model
    } catch (error) {
      const duration = Date.now() - startTime
      
      this.loggerService.error('Update operation - FAILED', {
        context: namespace,
        data: {
          computedWhere,
          data,
          duration,
          error,
          errorMessage: error instanceof Error ? error.message : String(error),
          errorStack: error instanceof Error ? error.stack : undefined,
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

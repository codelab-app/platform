// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { IRepository } from '@codelab/frontend/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

/**
 * {@link IBaseRepository}
 */
export abstract class AbstractRepository<
  Model extends IEntity,
  ModelFragment,
  Where extends { id?: string | null; name?: string | null },
> implements
    Omit<IRepository<Model, ModelFragment, Where>, 'delete' | 'deleteMany'>
{
  abstract find(where: Where): Promise<Array<ModelFragment>>

  /**
   * Find 1 item based on where, if more than 1 return first found
   */
  public async findOne(where: Where): Promise<ModelFragment | undefined> {
    const items = await this.find(where)

    if (items.length > 1) {
      console.warn('More than 1 item found, returning the first')

      return items[0]
    }

    return items[0]
  }

  public addMany(data: Array<Model>): Promise<Array<ModelFragment>> {
    // console.debug(`Adding ${this.constructor.name}`, data)

    return this._addMany(data)
  }

  public async add(data: Model): Promise<ModelFragment | undefined> {
    // console.debug(`Adding ${this.constructor.name}`, data)

    return (await this._addMany([data]))[0]
  }

  protected abstract _addMany(data: Array<Model>): Promise<Array<ModelFragment>>

  /**
   * We disallow updating of ID, since it disallows us from keying a where search by name, and having consistent ID.
   *
   * Say we created some DTO data that is keyed by name, but with a generated ID. After finding existing record and performing update, we will actually update the ID as we ll.
   */
  public update(data: Model, where: Where): Promise<ModelFragment | undefined> {
    // console.debug(`Updating ${this.constructor.name}`, data, { where })

    return this._update(data, where)
  }

  protected abstract _update(
    data: Model,
    where: Where,
  ): Promise<ModelFragment | undefined>

  /**
   * Upsert behavior, uses data id by default for upsert. If `where` clause is specified, then it overrides id
   *
   * We have this special behavior for importing data. Sometimes the ID doesn't match up, and we need to upsert by another field such as unique name
   *
   * @param where
   */
  async save(data: Model, where: Where): Promise<ModelFragment | undefined> {
    if (await this.exists(where)) {
      const results = this.update(data, this.getWhere(where))

      return results
    }

    return await this.add(data)
  }

  async exists(where: Where) {
    const results = await this.find(this.getWhere(where))

    // console.debug('Checking Exists: ', this.constructor, {
    //   data,
    //   where: this.getWhere(data, where),
    //   results,
    // })

    return Boolean(results)
  }

  /**
   * Some type checking to make sure the where clause is valid, needs to contain at least 1 key
   */
  getWhere(where: Where): Where {
    const values = Object.keys(where)

    if (!values.length) {
      throw new Error('Where clause needs to contain at least 1 key')
    }

    return where
  }
}

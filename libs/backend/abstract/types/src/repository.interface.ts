import type { BaseUniqueWhere, IEntity } from '@codelab/shared/abstract/types'

export interface IRepository<Model extends IEntity> {
  find(where: BaseUniqueWhere): Promise<Model | undefined>
  add(data: Array<Model>): Promise<Array<Model>>
  update(
    data: Omit<Model, 'id'>,
    where: BaseUniqueWhere,
  ): Promise<Model | undefined>
  save(data: Model, where?: BaseUniqueWhere): Promise<Model | undefined>
  exists(data: Model, where?: BaseUniqueWhere): Promise<boolean>
}

export abstract class AbstractRepository<Model extends IEntity>
  implements IRepository<Model>
{
  abstract find(where: BaseUniqueWhere): Promise<Model | undefined>

  public add(data: Array<Model>): Promise<Array<Model>> {
    // console.debug(`Adding ${this.constructor.name}`, data)

    return this._add(data)
  }

  protected abstract _add(data: Array<Model>): Promise<Array<Model>>

  /**
   * We disallow updating of ID, since it disallows us from keying a where search by name, and having consistent ID.
   *
   * Say we created some DTO data that is keyed by name, but with a generated ID. After finding existing record and performing update, we will actually update the ID as we ll.
   */
  public update(
    data: Omit<Model, 'id'>,
    where: BaseUniqueWhere,
  ): Promise<Model | undefined> {
    // console.debug(`Updating ${this.constructor.name}`, data, { where })

    return this._update(data, where)
  }

  protected abstract _update(
    data: Omit<Model, 'id'>,
    where: BaseUniqueWhere,
  ): Promise<Model | undefined>

  /**
   * Upsert behavior, uses data id by default for upsert. If `where` clause is specified, then it overrides id
   *
   * @param where
   */
  async save(data: Model, where?: BaseUniqueWhere): Promise<Model | undefined> {
    if (await this.exists(data, where)) {
      const { id, ...updateData } = data
      const results = this.update(updateData, this.getWhere(data, where))

      return results
    }

    return (await this.add([data]))[0]
  }

  async exists(data: Model, where?: BaseUniqueWhere) {
    const results = await this.find(this.getWhere(data, where))

    // console.debug('Checking Exists: ', this.constructor, {
    //   data,
    //   where: this.getWhere(data, where),
    //   results,
    // })

    return Boolean(results)
  }

  /**
   * Specifying a `where` clause overrides the  id
   */
  getWhere(data: Model, where?: BaseUniqueWhere) {
    return where ? where : { id: data.id }
  }
}

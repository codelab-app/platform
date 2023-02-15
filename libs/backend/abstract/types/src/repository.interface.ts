import type { BaseUniqueWhere, IEntity } from '@codelab/shared/abstract/types'

export abstract class IRepository<Model extends IEntity> {
  abstract find(where: BaseUniqueWhere): Promise<Model | undefined>

  public add(data: Array<Model>): Promise<Array<Model>> {
    console.log(`Adding ${this.constructor.name}`, data)

    return this._add(data)
  }

  protected abstract _add(data: Array<Model>): Promise<Array<Model>>

  public update(
    data: Model,
    where: BaseUniqueWhere,
  ): Promise<Model | undefined> {
    // Add logger here
    console.log(`Updating ${this.constructor.name}`, data, { where })

    return this._update(data, where)
  }

  protected abstract _update(
    data: Model,
    where: BaseUniqueWhere,
  ): Promise<Model | undefined>

  /**
   * Upsert behavior, uses data id by default for upsert. If `where` clause is specified, then it overrides id
   *
   * @param where
   */
  async save(data: Model, where?: BaseUniqueWhere): Promise<Model | undefined> {
    if (await this.exists(data, where)) {
      const results = this.update(data, this.getWhere(data, where))

      return results
    }

    return (await this.add([data]))[0]
  }

  async exists(data: Model, where?: BaseUniqueWhere) {
    const results = await this.find(this.getWhere(data, where))

    console.log('Checking Exists: ', this.constructor, { data, where, results })

    return Boolean(results)
  }

  /**
   * Specifying a `where` clause overrides the id
   */
  getWhere(data: Model, where?: BaseUniqueWhere) {
    return where ? where : { id: data.id }
  }
}

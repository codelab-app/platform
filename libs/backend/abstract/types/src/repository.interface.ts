import type { IEntity } from '@codelab/shared/abstract/types'

export interface IRepository<
  Model extends IEntity,
  ModelData,
  Where extends { id?: string | null },
> {
  add(data: Array<Model>): Promise<Array<ModelData>>
  exists(data: Model, where?: Where): Promise<boolean>
  findOne(where: Where): Promise<ModelData | undefined>
  save(data: Model, where?: Where): Promise<ModelData | undefined>
  update(data: Model, where: Where): Promise<ModelData | undefined>
}

export abstract class AbstractRepository<
  Model extends IEntity,
  ModelData,
  Where extends { id?: string | null },
> implements IRepository<Model, ModelData, Where>
{
  async findOne(where: Where): Promise<ModelData | undefined> {
    return (await this.find(where))[0]
  }

  abstract find(where: Where): Promise<Array<ModelData>>

  public add(data: Array<Model>): Promise<Array<ModelData>> {
    console.debug(`Adding ${this.constructor.name}`, data)

    return this._add(data)
  }

  protected abstract _add(data: Array<Model>): Promise<Array<ModelData>>

  /**
   * We disallow updating of ID, since it disallows us from keying a where search by name, and having consistent ID.
   *
   * Say we created some DTO data that is keyed by name, but with a generated ID. After finding existing record and performing update, we will actually update the ID as we ll.
   */
  public update(data: Model, where: Where): Promise<ModelData | undefined> {
    console.debug(`Updating ${this.constructor.name}`, data, { where })

    return this._update(data, where)
  }

  protected abstract _update(
    data: Model,
    where: Where,
  ): Promise<ModelData | undefined>

  /**
   * Upsert behavior, uses data id by default for upsert. If `where` clause is specified, then it overrides id
   *
   * @param where
   */
  async save(data: Model, where?: Where): Promise<ModelData | undefined> {
    const computedWhere = this.getWhere(data, where)

    if (await this.exists(data, computedWhere)) {
      const results = this.update(data, computedWhere)

      return results
    }

    return (await this.add([data]))[0]
  }

  async exists(data: Model, where: Where) {
    const results = await this.findOne(where)

    console.debug('Checking Exists: ', this.constructor, {
      data,
      results,
      where,
    })

    return Boolean(results)
  }

  /**
   * Specifying a `where` clause overrides the  id
   */
  private getWhere(data: Model, where?: Where) {
    return where ? where : ({ id: data.id } as Where)
  }
}

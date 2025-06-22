import type { IRef } from '@codelab/shared-abstract-core'
import type { Static, TAnySchema } from '@sinclair/typebox'

/**
 * Requires `noImplicityAbstractOverride' https://github.com/microsoft/TypeScript/issues/47250
 *
 * Move as interface for now
 */
export interface IRepository<
  Dto extends IRef,
  Model extends IRef,
  Where extends { id?: string | null },
  Options,
> {
  /**
   * Return `IRef` since our mutations only return ID
   */
  add(data: Dto): Promise<IRef>
  addMany(data: Array<Dto>): Promise<Array<IRef>>
  exists(where: Where): Promise<boolean>
  find(args?: { where?: Where; options?: Options }): Promise<Array<Model>>
  /**
   * We enforce schema validation if selectionSet is enabled
   */
  find<T extends TAnySchema>(args?: {
    where?: Where
    options?: Options
    schema: T
    selectionSet?: string
  }): Promise<Array<Static<T>>>

  /**
   * Finds one without schema validation
   */
  findOne(args?: {
    where: Where
    options?: Options
  }): Promise<Model | undefined>

  /**
   * Finds one with schema validation
   */
  findOne<T extends TAnySchema>(args: {
    where: Where
    options?: Options
    selectionSet?: string
    schema: T
  }): Promise<Static<T> | undefined>

  findOneOrFail(args?: { where: Where; options?: Options }): Promise<Model>

  findOneOrFail(args?: { where: Where; options?: Options }): Promise<Model>
  save(data: Dto, where?: Where): Promise<IRef | undefined>
  update(data: Dto, where: Where): Promise<IRef | undefined>
}

import type { BaseUniqueWhere, IEntity } from '@codelab/shared/abstract/types'

/**
 * Extended by our domain models
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IModel {
  /**
   * Checks whether the entity exists in the database
   */
  // exists(where: BaseUniqueWhere): Promise<boolean>
  // create(): Promise<Model>
  // repository?: Repository
}

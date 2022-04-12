import { IBaseType } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'

/**
 * Allows picking an existing page from the list of pages.
 */
export interface IPageType extends IBaseType {
  typeKind: typeof TypeKind.PageType
}

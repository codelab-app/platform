import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseType } from '../base-type'

/**
 * Allows picking an existing page from the list of pages.
 */
export interface IPageType extends IBaseType {
  kind: ITypeKind.PageType
}

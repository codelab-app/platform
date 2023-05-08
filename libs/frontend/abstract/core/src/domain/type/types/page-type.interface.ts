import type {
  PageTypeCreateInput,
  UpdatePageTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type { IPageTypeDTO, ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseType } from './base-type.interface'

/**
 * Allows picking an existing page from the list of pages.
 */
export interface IPageType
  extends IBaseType<
    IPageTypeDTO,
    PageTypeCreateInput,
    UpdatePageTypesMutationVariables
  > {
  kind: ITypeKind.PageType
}

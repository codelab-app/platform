import type {
  PageTypeCreateInput,
  UpdatePageTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseType } from '../base-type'
import type { IPageTypeDTO } from './page-type.dto.interface'

/**
 * Allows picking an existing page from the list of pages.
 */
export interface IPageType
  extends Omit<
    IBaseType<
      IPageTypeDTO,
      PageTypeCreateInput,
      UpdatePageTypesMutationVariables,
      void
    >,
    'toDeleteInput'
  > {
  kind: ITypeKind.PageType
}

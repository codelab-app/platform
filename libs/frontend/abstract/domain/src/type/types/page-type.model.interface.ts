import type {
  PageTypeCreateInput,
  UpdatePageTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type { IPageTypeDTO, ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseTypeModel } from './base-type.model.interface'

/**
 * Allows picking an existing page from the list of pages.
 */
export interface IPageTypeModel
  extends IBaseTypeModel<
    IPageTypeDTO,
    PageTypeCreateInput,
    UpdatePageTypesMutationVariables
  > {
  kind: ITypeKind.PageType
}

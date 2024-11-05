import type { IPageTypeDto, ITypeKind } from '@codelab/shared/abstract/core'
import type {
  PageTypeCreateInput,
  UpdatePageTypesMutationVariables,
} from '@codelab/shared/infra/gql'

import type { IBaseTypeModel } from './base-type.model.interface'

/**
 * Allows picking an existing page from the list of pages.
 */
export interface IPageTypeModel extends IBaseTypeModel<IPageTypeDto> {
  kind: ITypeKind.PageType
}

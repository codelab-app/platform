import type { IRichTextTypeDto, ITypeKind } from '@codelab/shared/abstract/core'
import type {
  RichTextTypeCreateInput,
  UpdateRichTextTypesMutationVariables,
} from '@codelab/shared/infra/gql'

import type { IBaseTypeModel } from './base-type.model.interface'

/**
 * Prop values for this type have the shape of {@see TypedProp} in order to
 */
export interface IRichTextTypeModel
  extends IBaseTypeModel<
    IRichTextTypeDto,
    RichTextTypeCreateInput,
    UpdateRichTextTypesMutationVariables
  > {
  kind: ITypeKind.RichTextType
}

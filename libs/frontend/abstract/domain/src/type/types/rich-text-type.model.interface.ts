import type { IRichTextTypeDto, ITypeKind } from '@codelab/shared-abstract-core'

import type { IBaseTypeModel } from './base-type.model.interface'

/**
 * Prop values for this type have the shape of {@see TypedProp} in order to
 */
export interface IRichTextTypeModel extends IBaseTypeModel<IRichTextTypeDto> {
  kind: ITypeKind.RichTextType
}

import type { ILambdaTypeDto, ITypeKind } from '@codelab/shared-abstract-core'

import type { IBaseTypeModel } from './base-type.model.interface'

/**
 * Allows picking a lambda
 */
export interface ILambdaTypeModel extends IBaseTypeModel<ILambdaTypeDto> {
  kind: ITypeKind.LambdaType
}

import type { IAnyTypeDto, ITypeKind } from '@codelab/shared-abstract-core'

import type { IBaseTypeModel } from './base-type.model.interface'

/**
 * Represents a type that can accept any value, similar to TypeScript's any type.
 * This is a flexible type that accepts any value without type checking.
 */
export interface IAnyTypeModel extends IBaseTypeModel<IAnyTypeDto> {
  kind: ITypeKind.AnyType
}

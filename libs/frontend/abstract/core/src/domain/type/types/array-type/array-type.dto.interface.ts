import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IBaseTypeDTO } from '../base-type'

export interface IArrayTypeDTO extends IBaseTypeDTO {
  __typename: `${ITypeKind.ArrayType}`
  itemType?: IEntity
}

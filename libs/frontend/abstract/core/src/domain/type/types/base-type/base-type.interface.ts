import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { ICacheService } from '../../../../service'
import type { ITypeDTO } from '../../type.dto.interface'

export interface IBaseType extends ICacheService<ITypeDTO, IBaseType> {
  id: string
  name: string
  kind: ITypeKind
  ownerId: string
}

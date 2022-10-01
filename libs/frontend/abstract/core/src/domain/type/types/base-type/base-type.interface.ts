import { ITypeKind } from '@codelab/shared/abstract/core'
import { ICacheService } from '../../../../service'
import { ITypeDTO } from '../../type.dto.interface'

export interface IBaseType extends ICacheService<ITypeDTO, IBaseType> {
  id: string
  name: string
  kind: ITypeKind
  ownerId: string
}

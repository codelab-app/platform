import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { ICacheService } from '../../../../service'
import type { IAuth0Owner } from '../../../user'
import type { ITypeDTO } from '../../type.dto.interface'

export interface IBaseType extends ICacheService<ITypeDTO, IBaseType> {
  id: string
  name: string
  kind: ITypeKind
  owner: IAuth0Owner
}

import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { ICacheService } from '../../../../service'
import type { IAuth0Owner, IOwnerSchema } from '../../../user'
import type { ITypeDTO } from '../../type.dto.interface'
import type { IBaseTypeDTO } from './base-type.dto.interface'

export interface IBaseType<DTO extends IBaseTypeDTO>
  extends ICacheService<DTO, IBaseType<DTO>>,
    IOwnerSchema {
  id: string
  name: string
  kind: ITypeKind
}

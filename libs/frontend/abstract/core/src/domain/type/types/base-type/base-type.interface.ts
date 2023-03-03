import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { ICacheService } from '../../../../service'
import type { IOwnerSchema } from '../../../user'
import type { IBaseTypeDTO } from './base-type.dto.interface'

export interface IBaseType<DTO extends IBaseTypeDTO>
  extends ICacheService<DTO, IBaseType<DTO>>,
    IOwnerSchema {
  id: string
  name: string
  kind: ITypeKind
}

import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { ICacheService } from '../../../../service'
import type { IModel } from '../../../model.interface'
import type { IOwnerSchema } from '../../../user'
import type { IBaseTypeDTO } from './base-type.dto.interface'

export interface IBaseType<DTO extends IBaseTypeDTO, CreateInput, UpdateInput>
  extends Omit<IModel<CreateInput, UpdateInput, void>, 'toDeleteInput'>,
    ICacheService<DTO, IBaseType<DTO, CreateInput, UpdateInput>>,
    IOwnerSchema {
  id: string
  kind: ITypeKind
  name: string
}

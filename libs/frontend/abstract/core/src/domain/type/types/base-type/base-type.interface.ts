import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ICacheService } from '../../../../service'
import type { ITypeDTO } from '../../type.dto.interface'

export interface IBaseType extends ICacheService<ITypeDTO, IBaseType> {
  id: string
  name: string
  kind: ITypeKind
  ownerId: string
  getPagination: (name_CONTAINS?: Maybe<string>) => Promise<{
    offset: number
  }>
}

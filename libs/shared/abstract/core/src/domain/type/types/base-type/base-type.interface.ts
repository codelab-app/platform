import { ICacheService } from '../../../../service'
import { ITypeDTO } from '../../type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export interface IBaseType extends ICacheService<ITypeDTO, IBaseType> {
  id: string
  name: string
  kind: ITypeKind
  ownerId: string
  // writeCache(fragment: any): void
  // owner: Ref<IUser>
  // makeCreateInput(id: string): ICreateTypeInput
  // makeUpdateInput(): IUpdateTypeArgs
  // applyUpdateData(data: any): void
}

export type IBaseTypeExportFields = 'id' | 'name' | 'kind'

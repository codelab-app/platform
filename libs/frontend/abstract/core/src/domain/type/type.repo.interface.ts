import type {
  BaseTypeWhere,
  TypeFragment,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { ITypeDTO } from './type.dto.interface'
import type { IType } from './types'

export type ITypeRepository = IRepository<
  IType,
  ITypeDTO,
  BaseTypeWhere
> & {
  findDescendants(parentIds: Array<string>): Promise<Array<TypeFragment>>
}

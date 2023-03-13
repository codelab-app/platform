import type {
  BaseTypeWhere,
  TypeFragment,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { IAnyType } from './types'

export type ITypeRepository = IRepository<IAnyType, TypeFragment, BaseTypeWhere>

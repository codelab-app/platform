import { IType } from '@codelab/shared/abstract/core'
import { EntityLike } from '@codelab/shared/abstract/types'

export interface ITypeNeo4jRepository {
  save(type: IType): Promise<void>
  exists(type: EntityLike): Promise<boolean>
  // findUnique(where: ITypeGraphWhereUnique): Promise<IType>
}

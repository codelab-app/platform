import { InMemoryRepository } from '@codelab/backend/infra'
import { IField, IType, ITypeGraph } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import {
  ITypeGraphWhereUnique,
  ITypeRepository,
  ITypesWhere,
  ITypeWhereUnique,
  TypeReferencesResponse,
} from '../type/type-repository.interface'

export class TypeInMemoryRepository
  extends InMemoryRepository<IType>
  implements ITypeRepository
{
  getGraphWhere(where: ITypeGraphWhereUnique): Promise<Maybe<ITypeGraph>> {
    throw new Error('Method not implemented.')
  }

  getOneWhere(where: ITypeWhereUnique): Promise<Maybe<IType>> {
    throw new Error('Method not implemented.')
  }

  getUserTypes(): Promise<Array<IType>> {
    throw new Error('Method not implemented.')
  }

  getAdminTypes(where: Maybe<ITypesWhere>): Promise<Array<IType>> {
    throw new Error('Method not implemented.')
  }

  getField(fieldId: string): Promise<Maybe<IField>> {
    throw new Error('Method not implemented.')
  }

  getTypeReferences(typeId: string): Promise<TypeReferencesResponse> {
    throw new Error('Method not implemented.')
  }

  getTypesByExactNames(names: Array<string>): Promise<Array<IType>> {
    throw new Error('Method not implemented.')
  }
}

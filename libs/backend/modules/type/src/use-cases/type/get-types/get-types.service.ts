import { UseCasePort } from '@codelab/backend/abstract/core'
import { isAdmin, IType } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { ITypeRepository, ITypeRepositoryToken } from '../../../infrastructure'
import { GetTypesRequest } from './get-types.request'

@Injectable()
export class GetTypesService
  implements UseCasePort<GetTypesRequest, Array<IType>>
{
  constructor(
    @Inject(ITypeRepositoryToken)
    private typeRepository: ITypeRepository,
  ) {}

  async execute(request: GetTypesRequest): Promise<Array<IType>> {
    const { input, transaction, currentUser } = request

    if (isAdmin(currentUser) || !currentUser) {
      return this.typeRepository.getAdminTypes(input?.where, transaction)
    }

    return this.typeRepository.getUserTypes(
      currentUser.id,
      input?.where,
      transaction,
    )
  }
}

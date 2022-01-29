import {
  ITransaction,
  ITypeRepository,
  ITypeRepositoryToken,
  UseCasePort,
} from '@codelab/backend/abstract/core'
import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import { isAdmin, IType } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { GetTypesRequest } from './get-types.request'

@Injectable()
export class GetTypesService
  extends DgraphUseCase<GetTypesRequest, Array<IType>>
  implements UseCasePort<GetTypesRequest, Array<IType>>
{
  protected override autoCommit = true

  constructor(
    dgraph: DgraphRepository,
    @Inject(ITypeRepositoryToken)
    private typeRepository: ITypeRepository,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: GetTypesRequest,
    txn: ITransaction,
  ): Promise<Array<IType>> {
    const { input, currentUser } = request

    if (isAdmin(currentUser) || !currentUser) {
      return this.typeRepository.getAdminTypes(input?.where, txn)
    }

    return this.typeRepository.getUserTypes(currentUser.id, input?.where, txn)
  }
}

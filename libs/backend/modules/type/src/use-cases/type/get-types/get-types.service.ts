import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository, ITransaction } from '@codelab/backend/infra'
import { isAdmin, IType } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { ITypeRepository, ITypeRepositoryToken } from '../../../infrastructure'
import { GetTypesRequest } from './get-types.request'

@Injectable()
export class GetTypesService extends DgraphUseCase<
  GetTypesRequest,
  Array<IType>
> {
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

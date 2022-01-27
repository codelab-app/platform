import {
  DgraphUseCase,
  exactlyOneWhereClause,
} from '@codelab/backend/application'
import { DgraphRepository, ITransaction } from '@codelab/backend/infra'
import { IType } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { Inject, Injectable } from '@nestjs/common'
import { ITypeRepository, ITypeRepositoryToken } from '../../../infrastructure'
import { GetTypeRequest } from './get-type.request'

@Injectable()
export class GetTypeService extends DgraphUseCase<
  GetTypeRequest,
  Maybe<IType>
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
    request: GetTypeRequest,
    txn: ITransaction,
  ) {
    this.validate(request)

    const {
      input: { where },
    } = request

    return this.typeRepository.getOneWhere(where, txn)
  }

  private validate(request: GetTypeRequest) {
    exactlyOneWhereClause(request, ['enumTypeValueId', 'id', 'atomId', 'name'])
  }
}

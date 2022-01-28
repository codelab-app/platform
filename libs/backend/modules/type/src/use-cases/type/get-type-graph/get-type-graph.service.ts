import {
  ITransaction,
  ITypeRepository,
  ITypeRepositoryToken,
  UseCasePort,
} from '@codelab/backend/abstract/core'
import {
  DgraphUseCase,
  exactlyOneWhereClause,
} from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import { ITypeGraph } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { Inject, Injectable } from '@nestjs/common'
import { GetTypeGraphRequest } from './get-type-graph.request'

@Injectable()
export class GetTypeGraphService
  extends DgraphUseCase<GetTypeGraphRequest, Maybe<ITypeGraph>>
  implements UseCasePort<GetTypeGraphRequest, Maybe<ITypeGraph>>
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
    request: GetTypeGraphRequest,
    txn: ITransaction,
  ): Promise<Maybe<ITypeGraph>> {
    this.validate(request)

    const {
      input: { where },
    } = request

    return this.typeRepository.getGraphWhere(where, txn)
  }

  private validate(request: GetTypeGraphRequest) {
    exactlyOneWhereClause(request, ['atomId', 'id', 'name'])
  }
}

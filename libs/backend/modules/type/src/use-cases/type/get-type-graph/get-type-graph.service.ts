import { UseCasePort } from '@codelab/backend/abstract/core'
import { exactlyOneWhereClause } from '@codelab/backend/application'
import { ITypeGraph } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { Inject, Injectable } from '@nestjs/common'
import { ITypeRepository, ITypeRepositoryToken } from '../../../infrastructure'
import { GetTypeGraphRequest } from './get-type-graph.request'

@Injectable()
export class GetTypeGraphService
  implements UseCasePort<GetTypeGraphRequest, Maybe<ITypeGraph>>
{
  constructor(
    @Inject(ITypeRepositoryToken)
    private typeRepository: ITypeRepository,
  ) {}

  async execute(request: GetTypeGraphRequest): Promise<Maybe<ITypeGraph>> {
    this.validate(request)

    const {
      input: { where },
      transaction,
    } = request

    return this.typeRepository.getGraphWhere(where, transaction)
  }

  private validate(request: GetTypeGraphRequest) {
    exactlyOneWhereClause(request, ['atomId', 'id', 'name'])
  }
}

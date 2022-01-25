import { UseCasePort } from '@codelab/backend/abstract/core'
import { exactlyOneWhereClause } from '@codelab/backend/application'
import { IType } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { Inject, Injectable } from '@nestjs/common'
import { ITypeRepository, ITypeRepositoryToken } from '../../../infrastructure'
import { GetTypeRequest } from './get-type.request'

@Injectable()
export class GetTypeService
  implements UseCasePort<GetTypeRequest, Maybe<IType>>
{
  constructor(
    @Inject(ITypeRepositoryToken)
    private typeRepository: ITypeRepository,
  ) {}

  async execute(request: GetTypeRequest) {
    this.validate(request)

    const {
      input: { where },
      transaction,
    } = request

    return this.typeRepository.getOneWhere(where, transaction)
  }

  private validate(request: GetTypeRequest) {
    exactlyOneWhereClause(request, ['enumTypeValueId', 'id', 'atomId', 'name'])
  }
}

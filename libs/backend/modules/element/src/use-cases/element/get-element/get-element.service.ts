import { UseCasePort } from '@codelab/backend/abstract/core'
import { exactlyOneWhereClause } from '@codelab/backend/application'
import { IElement } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import {
  IElementRepository,
  IElementRepositoryToken,
} from '../../../infrastructure/repositories/abstract/element-repository.interface'
import { GetElementRequest } from './get-element.request'

@Injectable()
export class GetElementService
  implements UseCasePort<GetElementRequest, IElement | undefined>
{
  constructor(
    @Inject(IElementRepositoryToken)
    private readonly elementRepository: IElementRepository,
  ) {}

  // TODO add enum value mapping
  execute(request: GetElementRequest): Promise<IElement | undefined> {
    exactlyOneWhereClause(request, ['id', 'fixedId'])

    const {
      input: { where },
      transaction,
    } = request

    if (where.fixedId) {
      return this.elementRepository.getOneByFixedId(where.fixedId, transaction)
    }

    if (where.id) {
      return this.elementRepository.getOne(where.id, transaction)
    }

    throw new Error('Invalid input, must have exactly one where clause')
  }
}

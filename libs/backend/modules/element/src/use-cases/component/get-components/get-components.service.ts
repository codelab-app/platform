import { UseCasePort } from '@codelab/backend/abstract/core'
import { IElement } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import {
  IElementRepository,
  IElementRepositoryToken,
} from '../../../infrastructure/repositories/abstract/element-repository.interface'
import { GetComponentsRequest } from './get-components.request'

@Injectable()
export class GetComponentsService
  implements UseCasePort<GetComponentsRequest, Array<IElement>>
{
  constructor(
    @Inject(IElementRepositoryToken)
    private readonly elementRepository: IElementRepository,
  ) {}

  async execute(request: GetComponentsRequest) {
    const { currentUser, input, transaction } = request

    return this.elementRepository.getComponents(
      {
        ownerId: currentUser.id,
        name: input?.searchQuery,
        uids: input?.componentIds,
      },
      transaction,
    )
  }
}

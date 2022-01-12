import { UseCasePort } from '@codelab/backend/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { ElementValidator } from '../../../application/element.validator'
import {
  IElementRepository,
  IElementRepositoryToken,
} from '../../../infrastructure/repositories/abstract/element-repository.interface'
import { DeleteElementRequest } from './delete-element.request'

/**
 * Deletes an element/component and all the descending elements and their props
 * Doesn't delete descendant component elements
 */
@Injectable()
export class DeleteElementService
  implements UseCasePort<DeleteElementRequest, void>
{
  constructor(
    @Inject(IElementRepositoryToken)
    private readonly elementRepository: IElementRepository,
    private readonly elementValidator: ElementValidator,
  ) {}

  async execute(request: DeleteElementRequest): Promise<void> {
    await this.validate(request)
    await this.elementRepository.delete(
      request.input.elementId,
      request.transaction,
    )
  }

  private async validate({
    input,
    currentUser,
    transaction,
  }: DeleteElementRequest) {
    await this.elementValidator.existsAndIsOwnedBy(
      input.elementId,
      currentUser,
      transaction,
    )

    await this.elementValidator.isNotRoot(input.elementId, transaction)

    // Prevent deleting components if they are used
    const element = await this.elementRepository.getOne(
      input.elementId,
      transaction,
    )

    if (element?.componentTag) {
      await this.elementValidator.isNotReferenced(input.elementId, transaction)
    }
  }
}

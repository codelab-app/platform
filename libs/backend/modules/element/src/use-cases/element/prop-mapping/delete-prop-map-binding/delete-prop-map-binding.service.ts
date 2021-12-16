import { UseCasePort } from '@codelab/backend/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { ElementValidator } from '../../../../application/element.validator'
import {
  IElementRepository,
  IElementRepositoryToken,
} from '../../../../infrastructure/repositories/abstract/element-repository.interface'
import { DeletePropMapBindingRequest } from './delete-prop-map-binding.request'

@Injectable()
export class DeletePropMapBindingService
  implements UseCasePort<DeletePropMapBindingRequest, void>
{
  constructor(
    @Inject(IElementRepositoryToken)
    private readonly elementRepository: IElementRepository,
    private readonly elementValidator: ElementValidator,
  ) {}

  async execute(request: DeletePropMapBindingRequest) {
    await this.validate(request)

    const {
      input: { propMapBindingIds, elementId },
      transaction,
    } = request

    const element = await this.elementRepository.getOne(elementId, transaction)

    if (!element) {
      // Should not happen, we check in .validate()
      throw new Error('Element not found')
    }

    for (const propMapBindingId of propMapBindingIds) {
      const pmb = element.propMapBindings.find((p) => p.id === propMapBindingId)

      if (!pmb) {
        throw new Error(
          `Prop map binding ${propMapBindingId} not found in the element ${elementId}`,
        )
      }

      await this.elementRepository.removePropMapBinding(
        elementId,
        pmb,
        transaction,
      )
    }
  }

  protected async validate({
    input: { elementId },
    currentUser,
    transaction,
  }: DeletePropMapBindingRequest) {
    await this.elementValidator.existsAndIsOwnedBy(
      elementId,
      currentUser,
      transaction,
    )
  }
}

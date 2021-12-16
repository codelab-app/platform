import { UseCasePort } from '@codelab/backend/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { ElementValidator } from '../../../../application/element.validator'
import {
  IElementRepository,
  IElementRepositoryToken,
} from '../../../../infrastructure/repositories/abstract/element-repository.interface'
import {
  IPropMapBindingsRepository,
  IPropMapBindingsRepositoryToken,
} from '../../../../infrastructure/repositories/abstract/prop-map-binding-repository.interface'
import { UpdatePropMapBindingRequest } from './update-prop-map-binding.request'

@Injectable()
export class UpdatePropMapBindingService
  implements UseCasePort<UpdatePropMapBindingRequest, void>
{
  constructor(
    @Inject(IElementRepositoryToken)
    private readonly elementRepository: IElementRepository,
    @Inject(IPropMapBindingsRepositoryToken)
    private readonly pmbRepository: IPropMapBindingsRepository,
    private readonly elementValidator: ElementValidator,
  ) {}

  async execute(request: UpdatePropMapBindingRequest) {
    await this.validate(request)

    const {
      input: { propMapBindingId, data, elementId },
      transaction,
    } = request

    const element = await this.elementRepository.getOne(elementId, transaction)

    if (!element) {
      // Should not happen, we check in .validate()
      throw new Error('Element not found')
    }

    const pmb = element.propMapBindings.find((p) => p.id === propMapBindingId)

    if (!pmb) {
      throw new Error(
        `Prop map binding ${propMapBindingId} not found in the element ${elementId}`,
      )
    }

    pmb.targetElementId = data.targetElementId
    pmb.targetKey = data.targetKey
    pmb.sourceKey = data.sourceKey

    await this.pmbRepository.update(pmb, transaction)
  }

  protected async validate({
    input: {
      elementId,
      data: { targetElementId },
    },
    transaction,
    currentUser,
  }: UpdatePropMapBindingRequest) {
    await this.elementValidator.existsAndIsOwnedBy(
      elementId,
      currentUser,
      transaction,
    )

    if (targetElementId) {
      await this.elementValidator.existsAndIsOwnedBy(
        targetElementId,
        currentUser,
        transaction,
      )
    }
  }
}

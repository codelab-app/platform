import { UseCasePort } from '@codelab/backend/abstract/core'
import { CreateResponse } from '@codelab/backend/application'
import {
  IPropMapBinding,
  PropMapBindingSchema,
} from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { ElementValidator } from '../../../../application/element.validator'
import {
  IElementRepository,
  IElementRepositoryToken,
} from '../../../../infrastructure/repositories/abstract/element-repository.interface'
import { CreatePropMapBindingRequest } from './create-prop-map-binding.request'

@Injectable()
export class CreatePropMapBindingService
  implements UseCasePort<CreatePropMapBindingRequest, CreateResponse>
{
  constructor(
    @Inject(IElementRepositoryToken)
    private readonly elementRepository: IElementRepository,
    private readonly elementValidator: ElementValidator,
  ) {}

  async execute(request: CreatePropMapBindingRequest) {
    await this.validate(request)

    const {
      input: { targetElementId, elementId, targetKey, sourceKey },
      transaction,
    } = request

    const pmb = PropMapBindingSchema.parse({
      targetElementId,
      targetKey,
      sourceKey,
    } as IPropMapBinding)

    return this.elementRepository.addPropMapBinding(elementId, pmb, transaction)
  }

  protected async validate({
    input: { elementId, targetElementId },
    currentUser,
    transaction,
  }: CreatePropMapBindingRequest) {
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

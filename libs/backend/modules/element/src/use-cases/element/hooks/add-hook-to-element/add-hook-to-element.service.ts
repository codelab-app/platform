import { UseCasePort } from '@codelab/backend/abstract/core'
import { CreateResponse } from '@codelab/backend/application'
import { HookSchema, IHook } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { ElementValidator } from '../../../../application/element.validator'
import {
  IElementRepository,
  IElementRepositoryToken,
} from '../../../../infrastructure/repositories/abstract/element-repository.interface'
import { AddHookToElementRequest } from './add-hook-to-element.request'

@Injectable()
export class AddHookToElementService
  implements UseCasePort<AddHookToElementRequest, CreateResponse>
{
  constructor(
    @Inject(IElementRepositoryToken)
    private readonly elementRepository: IElementRepository,
    private readonly elementValidator: ElementValidator,
  ) {}

  async execute(request: AddHookToElementRequest) {
    await this.validate(request)

    const { input, transaction } = request

    const hook = HookSchema.parse({
      config: {
        data: input.config,
      },
      type: input.type,
    } as IHook)

    return this.elementRepository.addHook(input.elementId, hook, transaction)
  }

  protected async validate({
    input: { elementId },
    currentUser,
    transaction,
  }: AddHookToElementRequest) {
    await this.elementValidator.existsAndIsOwnedBy(
      elementId,
      currentUser,
      transaction,
    )
  }
}

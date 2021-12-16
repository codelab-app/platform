import { UseCasePort } from '@codelab/backend/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import {
  IElementRepository,
  IElementRepositoryToken,
} from '../../../../infrastructure/repositories/abstract/element-repository.interface'
import { RemoveHookFromElementRequest } from './remove-hook-from-element.request'

@Injectable()
export class RemoveHookFromElementService
  implements UseCasePort<RemoveHookFromElementRequest, void>
{
  constructor(
    @Inject(IElementRepositoryToken)
    private readonly elementRepository: IElementRepository,
  ) {}

  async execute({
    input: { hookId, elementId },
    transaction,
  }: RemoveHookFromElementRequest) {
    const element = await this.elementRepository.getOne(elementId, transaction)

    if (!element) {
      throw new Error('Element not found')
    }

    const hook = element.hooks.find(({ id }) => id === hookId)

    if (!hook) {
      throw new Error('Hook not found or not attached to the element')
    }

    await this.elementRepository.removeHook(elementId, hook, transaction)
  }
}

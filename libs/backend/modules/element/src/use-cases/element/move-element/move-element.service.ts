import { UseCasePort } from '@codelab/backend/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { ElementValidator } from '../../../application/element.validator'
import {
  IElementRepository,
  IElementRepositoryToken,
} from '../../../infrastructure/repositories/abstract/element-repository.interface'
import { MoveElementRequest } from './move-element.request'

@Injectable()
export class MoveElementService
  implements UseCasePort<MoveElementRequest, void>
{
  constructor(
    @Inject(IElementRepositoryToken)
    private readonly elementRepository: IElementRepository,
    private elementValidator: ElementValidator,
  ) {}

  async execute(request: MoveElementRequest): Promise<void> {
    const {
      input: { elementId, moveData },
      transaction,
    } = request

    await this.validate(request)

    const element = await this.elementRepository.getOne(elementId, transaction)

    if (!element) {
      throw new Error('Element not found')
    }

    element.parentElement = moveData.parentElementId
      ? {
          id: moveData.parentElementId,
          order: moveData.order,
        }
      : undefined

    await this.elementRepository.update(element, transaction)
  }

  protected async validate({
    input: {
      moveData: { parentElementId },
      elementId,
    },
    transaction,
    currentUser,
  }: MoveElementRequest) {
    if (parentElementId === elementId) {
      throw new Error("Can't move element within itself")
    }

    await this.elementValidator.existsAndIsOwnedBy(
      elementId,
      currentUser,
      transaction,
    )

    if (parentElementId) {
      await this.elementValidator.existsAndIsOwnedBy(
        parentElementId,
        currentUser,
        transaction,
      )
    }

    await this.elementValidator.isNotRoot(elementId, transaction)
  }
}

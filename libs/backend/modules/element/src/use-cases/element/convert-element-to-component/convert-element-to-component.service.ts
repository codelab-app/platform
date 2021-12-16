import { UseCasePort } from '@codelab/backend/abstract/core'
import { attachComponentTag } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { ElementValidator } from '../../../application/element.validator'
import {
  IElementRepository,
  IElementRepositoryToken,
} from '../../../infrastructure/repositories/abstract/element-repository.interface'
import { CreateElementService } from '../create-element'
import { MoveElementService } from '../move-element'
import { ConvertElementToComponentRequest } from './convert-element-to-component.request'

@Injectable()
export class ConvertElementToComponentService
  implements UseCasePort<ConvertElementToComponentRequest, void>
{
  constructor(
    @Inject(IElementRepositoryToken)
    private readonly elementRepository: IElementRepository,
    private elementValidator: ElementValidator,
    private createElementService: CreateElementService,
    private moveElementService: MoveElementService,
  ) {}

  async execute(request: ConvertElementToComponentRequest): Promise<void> {
    await this.validate(request)

    const {
      input: { elementId, componentName },
      currentUser,
      transaction,
    } = request

    // Get the element so we can get its name properly
    const targetElement = await this.elementRepository.getOne(
      elementId,
      transaction,
    )

    if (!targetElement) {
      throw new Error(`Element with id ${elementId} not found`)
    }

    attachComponentTag(targetElement, currentUser, componentName)

    // Add an intermediate element between the parent and the new component, which will act as the component instance
    if (targetElement?.parentElement && targetElement.id) {
      await this.createElementService.execute({
        input: {
          name: targetElement.name ?? undefined,
          parentElementId: targetElement?.parentElement?.id,
          instanceOfComponentId: targetElement.id,
        },
        currentUser,
        transaction,
      })

      // Delete the old parent-child relation
      await this.moveElementService.execute({
        input: {
          elementId: targetElement.id,
          moveData: { parentElementId: undefined, order: 0 },
        },
        currentUser,
        transaction,
      })
    }
  }

  protected async validate({
    input: { elementId },
    currentUser,
    transaction,
  }: ConvertElementToComponentRequest): Promise<void> {
    await this.elementValidator.existsAndIsOwnedBy(
      elementId,
      currentUser,
      transaction,
    )
  }
}

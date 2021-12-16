import { UseCasePort } from '@codelab/backend/abstract/core'
import { UpdatePropService } from '@codelab/backend/modules/prop'
import { Inject, Injectable } from '@nestjs/common'
import { ElementValidator } from '../../../application/element.validator'
import {
  IElementRepository,
  IElementRepositoryToken,
} from '../../../infrastructure/repositories/abstract/element-repository.interface'
import { UpdateElementPropsRequest } from './update-element-props.request'

@Injectable()
export class UpdateElementPropsService
  implements UseCasePort<UpdateElementPropsRequest, void>
{
  constructor(
    @Inject(IElementRepositoryToken)
    private readonly elementRepository: IElementRepository,
    private updatePropService: UpdatePropService,
    private elementValidator: ElementValidator,
  ) {}

  async execute(request: UpdateElementPropsRequest) {
    await this.validate(request)

    const { data, elementId } = request.input

    const element = await this.elementRepository.getOne(
      elementId,
      request.transaction,
    )

    if (!element) {
      // Should not happen, we check in .validate()
      throw new Error('Element not found')
    }

    await this.updatePropService.execute({
      input: { id: element.props.id, data },
      transaction: request.transaction,
    })
  }

  protected async validate({
    input: { elementId },
    currentUser,
    transaction,
  }: UpdateElementPropsRequest): Promise<void> {
    await this.elementValidator.existsAndIsOwnedBy(
      elementId,
      currentUser,
      transaction,
    )

    // TODO, we didn't validate props here

    await this.elementValidator.propsAreValid(elementId)
  }
}

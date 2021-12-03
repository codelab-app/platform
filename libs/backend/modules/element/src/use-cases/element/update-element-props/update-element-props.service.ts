import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import { UpdatePropService } from '@codelab/backend/modules/prop'
import { Injectable } from '@nestjs/common'
import { ElementValidator } from '../../../application/element.validator'
import { UpdateElementPropsRequest } from './update-element-props.request'

@Injectable()
export class UpdateElementPropsService extends DgraphUseCase<UpdateElementPropsRequest> {
  constructor(
    dgraph: DgraphRepository,
    private updatePropService: UpdatePropService,
    private elementValidator: ElementValidator,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(request: UpdateElementPropsRequest) {
    await this.validate(request)

    const { data, propsId } = request.input
    this.updatePropService.execute({ input: { id: propsId, data } })
  }

  protected async validate({
    input: { elementId },
    currentUser,
  }: UpdateElementPropsRequest): Promise<void> {
    const result = await this.elementValidator.existsAndIsOwnedBy(
      elementId,
      currentUser,
    )

    // TODO, we didn't validate props here

    await this.elementValidator.propsAreValid(elementId)
  }
}

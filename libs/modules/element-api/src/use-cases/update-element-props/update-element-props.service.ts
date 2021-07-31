import {
  DgraphElement,
  DgraphRepository,
  DgraphUseCase,
  jsonMutation,
} from '@codelab/backend'
import { GetAtomService } from '@codelab/modules/atom-api'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import { ElementValidator } from '../../element.validator'
import { UpdateElementPropsRequest } from './update-element-props.request'

@Injectable()
export class UpdateElementPropsService extends DgraphUseCase<UpdateElementPropsRequest> {
  constructor(
    dgraph: DgraphRepository,
    private getAtomService: GetAtomService,
    private elementValidator: ElementValidator,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: UpdateElementPropsRequest,
    txn: Txn,
  ) {
    await this.validate(request)

    await this.dgraph.executeMutation(txn, this.createMutation(request))
  }

  protected createMutation({
    input: { elementId, props },
  }: UpdateElementPropsRequest) {
    return jsonMutation<DgraphElement>({
      uid: elementId,
      props,
    })
  }

  protected async validate({
    input: { elementId, props },
    currentUser,
  }: UpdateElementPropsRequest): Promise<void> {
    const result = await this.elementValidator.existsAndIsOwnedBy(
      elementId,
      currentUser,
    )

    await this.elementValidator.propsAreValid(elementId, props)
  }
}

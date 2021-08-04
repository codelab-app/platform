import {
  DgraphElement,
  DgraphRepository,
  DgraphUseCase,
  jsonMutation,
} from '@codelab/backend'
import { GetAtomService } from '@codelab/modules/atom-api'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { ElementValidator } from '../../element.validator'
import { UpdateElementRequest } from './update-element.request'

@Injectable()
export class UpdateElementService extends DgraphUseCase<UpdateElementRequest> {
  constructor(
    dgraph: DgraphRepository,
    private getAtomService: GetAtomService,
    private elementValidator: ElementValidator,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(request: UpdateElementRequest, txn: Txn) {
    await this.validate(request)

    await this.dgraph.executeMutation(txn, this.createMutation(request))
  }

  protected createMutation({
    input: {
      elementId,
      updateData: { atomId, css, name, componentId },
    },
  }: UpdateElementRequest) {
    return jsonMutation<DgraphElement>({
      uid: elementId,
      name,
      atom: atomId ? { uid: atomId } : null,
      component: componentId ? { uid: componentId } : null,
      css: css || '',
    })
  }

  protected async validate({
    input: {
      elementId,
      updateData: { atomId },
    },
    currentUser,
  }: UpdateElementRequest): Promise<void> {
    await this.elementValidator.existsAndIsOwnedBy(elementId, currentUser)

    if (atomId) {
      const atom = await this.getAtomService.execute({ byId: { atomId } })

      if (!atom) {
        throw new Error('Atom not found')
      }
    }
  }
}

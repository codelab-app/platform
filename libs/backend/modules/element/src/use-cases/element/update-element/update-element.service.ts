import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphElement,
  DgraphRepository,
  jsonMutation,
} from '@codelab/backend/infra'
import { GetAtomService } from '@codelab/backend/modules/atom'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { ElementValidator } from '../../../application/element.validator'
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
      id,
      data: { atomId, css, name, componentId },
    },
  }: UpdateElementRequest) {
    return jsonMutation<DgraphElement>({
      uid: id,
      name,
      atom: atomId ? { uid: atomId } : null,
      component: componentId ? { uid: componentId } : null,
      css: css || '',
    })
  }

  protected async validate({
    input: {
      id,
      data: { atomId },
    },
    currentUser,
  }: UpdateElementRequest): Promise<void> {
    await this.elementValidator.existsAndIsOwnedBy(id, currentUser)

    if (atomId) {
      const atom = await this.getAtomService.execute({ where: { id: atomId } })

      if (!atom) {
        throw new Error('Atom not found')
      }
    }
  }
}

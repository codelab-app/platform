import {
  CreateResponse,
  DgraphCreateMutationJson,
  DgraphCreateUseCase,
  DgraphElement,
  DgraphEntityType,
  DgraphRepository,
} from '@codelab/backend/infra'
import { GetAtomService } from '@codelab/backend/modules/atom'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { ElementValidator } from '../../element.validator'
import { GetElementGraphService } from '../get-element-graph'
import { GetLastOrderChildService } from '../get-last-order-child'
import { CreateElementInput } from './create-element.input'
import { CreateElementRequest } from './create-element.request'

@Injectable()
export class CreateElementService extends DgraphCreateUseCase<CreateElementRequest> {
  constructor(
    protected readonly dgraph: DgraphRepository,
    private getElementService: GetElementGraphService,
    private getLastOrderChildService: GetLastOrderChildService,
    private getAtomService: GetAtomService,
    private elementValidator: ElementValidator,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: CreateElementRequest,
    txn: Txn,
  ): Promise<CreateResponse> {
    await this.validate(request)

    const { input } = request
    const order = await this.getOrder(input)

    return await this.dgraph.create(txn, (blankNodeUid) =>
      CreateElementService.createMutation({ ...input, order }, blankNodeUid),
    )
  }

  private static createMutation(
    { parentElementId, order, name, atomId, componentId }: CreateElementInput,
    blankNodeUid: string,
  ) {
    const mu: Mutation = {}

    const createElementJson: DgraphCreateMutationJson<DgraphElement> = {
      uid: blankNodeUid,
      name,
      'dgraph.type': [DgraphEntityType.Node, DgraphEntityType.Element],
      'children|order': order ? order : 1,
      children: [],
      atom: atomId ? { uid: atomId } : null,
      component: componentId ? { uid: componentId } : null,
      props: '{}',
    }

    if (parentElementId) {
      mu.setJson = {
        uid: parentElementId,
        children: createElementJson,
      }
    } else {
      mu.setJson = createElementJson
    }

    return mu
  }

  /**
   * Returns the order from the request if defined, if not - gets the order of the last child of the same parent
   * and returns it + 1
   */
  private async getOrder(request: CreateElementInput): Promise<number> {
    const { order, parentElementId } = request

    if (order) {
      return order
    }

    if (parentElementId) {
      // if we don't have order - put it last
      const lastOrderChild = await this.getLastOrderChildService.execute({
        elementId: parentElementId,
      })

      if (lastOrderChild && typeof lastOrderChild.order === 'number') {
        return lastOrderChild.order + 1
      }
    }

    // If nothing else - put it by default as 1
    return 1
  }

  protected async validate({
    input: { parentElementId, atomId },
    currentUser,
  }: CreateElementRequest) {
    if (parentElementId) {
      /** Validate the parent element exists and is owned by the current user */
      await this.elementValidator.existsAndIsOwnedBy(
        parentElementId,
        currentUser,
      )
    }

    if (atomId) {
      /** Validate the atom exists */
      const atom = await this.getAtomService.execute({ byId: { atomId } })

      if (!atom) {
        throw new Error('Atom not found')
      }
    }
  }
}

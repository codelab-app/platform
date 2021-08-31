import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { ElementValidator } from '../../../application/element.validator'
import { GetElementParentService } from '../get-element-parent'
import { MoveElementInput } from './move-element.input'
import { MoveElementRequest } from './move-element.request'

@Injectable()
export class MoveElementService extends DgraphUseCase<MoveElementRequest> {
  constructor(
    protected readonly dgraph: DgraphRepository,
    private getElementParentService: GetElementParentService,
    private elementValidator: ElementValidator,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(request: MoveElementRequest, txn: Txn) {
    const { input } = request

    await this.validate(request)

    const existingParent = await this.getElementParentService.execute({
      elementId: input.elementId,
    })

    // Delete the old parent-child edge and create a new one
    const mu: Mutation = {}
    mu.setNquads = MoveElementService.createSetMutation(input)

    if (
      existingParent?.uid &&
      existingParent.uid !== input.moveData.parentElementId
    ) {
      mu.deleteNquads = MoveElementService.createDeleteMutation(
        input,
        existingParent.uid,
      )
    }

    await this.dgraph.executeMutation(txn, mu)
  }

  private static createSetMutation({
    elementId,
    moveData: { parentElementId, order },
  }: MoveElementInput) {
    return `<${parentElementId}> <children> <${elementId}> (order=${order}) .`
  }

  private static createDeleteMutation(
    { elementId }: MoveElementInput,
    existingParentId: string,
  ) {
    return `<${existingParentId}> <children> <${elementId}> .`
  }

  protected async validate({
    input: {
      moveData: { parentElementId },
      elementId,
    },
    currentUser,
  }: MoveElementRequest) {
    const movedElementData = await this.elementValidator.existsAndIsOwnedBy(
      elementId,
      currentUser,
    )

    const targetParentData = await this.elementValidator.existsAndIsOwnedBy(
      parentElementId,
      currentUser,
    )

    await this.elementValidator.isNotRoot(elementId)

    if (parentElementId === elementId) {
      throw new Error("Can't move element within itself")
    }

    if (
      movedElementData.tree &&
      targetParentData.tree &&
      movedElementData.tree.uid !== targetParentData.tree.uid
    ) {
      throw new Error("Can't move element to a different tree")
    }
  }
}

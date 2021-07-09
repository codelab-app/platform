import { DgraphProvider, DgraphTokens, DgraphUseCase } from '@codelab/backend'
import { Dgraph_ElementFragment } from '@codelab/codegen/dgraph'
import { Inject, Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js'
import { ElementGuardService } from '../../auth'
import { Element } from '../../models'
import { GetElementService } from '../get-element'
import { GetElementParentService } from '../get-element-parent'
import { MoveElementInput } from './move-element.input'
import { MoveElementRequest } from './move-element.request'

interface ValidationContext {
  existingParent: Dgraph_ElementFragment
}

@Injectable()
export class MoveElementService extends DgraphUseCase<
  MoveElementRequest,
  Element,
  ValidationContext
> {
  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    protected readonly dgraphProvider: DgraphProvider,
    private getElementParentService: GetElementParentService,
    private getElementService: GetElementService,
    private elementGuardService: ElementGuardService,
  ) {
    super(dgraphProvider)
  }

  protected async executeTransaction(
    { input, currentUser }: MoveElementRequest,
    txn: Txn,
    { existingParent }: ValidationContext,
  ) {
    // Delete the old parent-child edge and create a new one
    const mu = new Mutation()
    mu.setSetNquads(MoveElementService.createSetMutation(input))
    mu.setDelNquads(
      MoveElementService.createDeleteMutation(input, existingParent.id),
    )

    await txn.mutate(mu)

    await txn.commit()

    return (await this.getElementService.execute({
      input: { elementId: input.elementId },
      currentUser,
    })) as Element
  }

  private static createSetMutation({
    elementId,
    moveData: { parentElementId, order },
  }: MoveElementInput) {
    return `
          <${elementId}> <Element.parent> <${parentElementId}> .
          <${parentElementId}> <Element.children> <${elementId}> (order=${order}) .
      `
  }

  private static createDeleteMutation(
    { elementId }: MoveElementInput,
    existingParentId: string,
  ) {
    return `
          <${existingParentId}> <Element.children> <${elementId}> .
      `
  }

  protected async validate({
    input: {
      moveData: { parentElementId },
      elementId,
    },
    currentUser,
  }: MoveElementRequest) {
    const existingParent = await this.getElementParentService.execute({
      elementId: elementId,
    })

    if (parentElementId === elementId) {
      throw new Error("Can't move element within itself")
    }

    if (!existingParent) {
      throw new Error("Can't move a root element")
    }

    // make sure the new parent exists and the user has ownership over it
    const { element: newParent } = await this.elementGuardService.validate(
      parentElementId,
      currentUser,
    )

    if (newParent.ownedBy.id !== existingParent.ownedBy.id) {
      throw new Error("Can't move page element to a different page")
    }

    return { existingParent }
  }
}

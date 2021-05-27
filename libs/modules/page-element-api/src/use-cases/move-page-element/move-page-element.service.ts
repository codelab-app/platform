import { DGraphService, DgraphUseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { PageElement } from '../../../../../dgraph/src/graphql-client-dgraph.generated'
import { PageElement } from '../../models'
import { GetPageElementService } from '../get-page-element'
import { GetPageElementParentService } from '../get-page-element-parent'
import { MovePageElementInput } from './move-page-element.input'

@Injectable()
export class MovePageElementService extends DgraphUseCase<
  MovePageElementInput,
  PageElement
> {
  constructor(
    dgraph: DGraphService,
    private getPageElementParentService: GetPageElementParentService,
    private getPageElementService: GetPageElementService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(request: MovePageElementInput, txn: Txn) {
    const existingParent = await this.getPageElementParentService.execute({
      pageElementId: request.pageElementId,
    })

    await this.validate(request, existingParent)

    // Delete the old parent-child edge and create a new one
    await txn.mutate({
      setNquads: MovePageElementService.createSetMutation(request),
      deleteNquads: MovePageElementService.createDeleteMutation(
        request,
        existingParent,
      ),
    })

    await txn.commit()

    return (await this.getPageElementService.execute({
      pageElementId: request.pageElementId,
    })) as PageElement
  }

  private static createSetMutation({
    pageElementId,
    moveData: { parentElementId, order },
  }: MovePageElementInput) {
    return `
          <${pageElementId}> <PageElement.parent> <${parentElementId}> .
          <${parentElementId}> <PageElement.children> <${pageElementId}> (order=${order}) .
      `
  }

  private static createDeleteMutation(
    { pageElementId }: MovePageElementInput,
    existingParent: PageElement | null,
  ) {
    if (!existingParent) {
      return undefined
    }

    return `
          <${existingParent.id}> <PageElement.children> <${pageElementId}> .
      `
  }

  private async validate(
    { moveData, pageElementId }: MovePageElementInput,
    existingParent: PageElement | null,
  ) {
    if (moveData.parentElementId === pageElementId) {
      throw new Error("Can't move element within itself")
    }

    //don't allow to move root page elements
    const { parentElementId } = moveData

    if (!existingParent) {
      throw new Error("Can't move root page element")
    }

    //make sure the new parent exists
    if (!parentElementId) {
      throw new Error("Can't move element. Parent page element  not provided")
    }

    const newParent = await this.getPageElementService.execute({
      pageElementId: parentElementId,
    })

    if (!newParent) {
      throw new Error(`Can't move element. Invalid parent page element`)
    }
  }
}

import { DgraphProvider, DgraphTokens, DgraphUseCase } from '@codelab/backend'
import { Dgraph_PageElementFragment } from '@codelab/dgraph'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { PageElementGuardService } from '../../auth'
import { PageElement } from '../../models'
import { GetPageElementService } from '../get-page-element'
import { GetPageElementParentService } from '../get-page-element-parent'
import { MovePageElementInput } from './move-page-element.input'
import { MovePageElementRequest } from './move-page-element.request'

interface ValidationContext {
  existingParent: Dgraph_PageElementFragment
}

@Injectable()
export class MovePageElementService extends DgraphUseCase<
  MovePageElementRequest,
  PageElement,
  ValidationContext
> {
  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    protected readonly dgraphProvider: DgraphProvider,
    private getPageElementParentService: GetPageElementParentService,
    private getPageElementService: GetPageElementService,
    private pageElementGuardService: PageElementGuardService,
  ) {
    super(dgraphProvider)
  }

  protected async executeTransaction(
    { input, currentUser }: MovePageElementRequest,
    txn: Txn,
    { existingParent }: ValidationContext,
  ) {
    // Delete the old parent-child edge and create a new one
    await txn.mutate({
      setNquads: MovePageElementService.createSetMutation(input),
      deleteNquads: MovePageElementService.createDeleteMutation(
        input,
        existingParent.id,
      ),
    })

    await txn.commit()

    return (await this.getPageElementService.execute({
      input: {
        pageElementId: input.pageElementId,
      },
      currentUser,
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
    existingParentId: string,
  ) {
    return `
          <${existingParentId}> <PageElement.children> <${pageElementId}> .
      `
  }

  protected async validate({
    input: {
      moveData: { parentElementId },
      pageElementId,
    },
    currentUser,
  }: MovePageElementRequest) {
    const existingParent = await this.getPageElementParentService.execute({
      pageElementId: pageElementId,
    })

    if (parentElementId === pageElementId) {
      throw new Error("Can't move element within itself")
    }

    if (!existingParent) {
      throw new Error("Can't move root page element")
    }

    //make sure the new parent exists and the user has ownership over it
    const { pageElement: newParent } =
      await this.pageElementGuardService.validate(parentElementId, currentUser)

    if (newParent.page.id !== existingParent.page.id) {
      throw new Error("Can't move page element to a different page")
    }

    return { existingParent }
  }
}

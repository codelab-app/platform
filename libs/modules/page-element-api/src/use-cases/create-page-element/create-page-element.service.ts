import { DgraphProvider, DgraphTokens, DgraphUseCase } from '@codelab/backend'
import { Dgraph_PageElementFragment } from '@codelab/dgraph'
import { Atom, GetAtomService } from '@codelab/modules/atom-api'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { PageElementGuardService } from '../../auth'
import { PageElement } from '../../models/'
import { GetLastOrderChildService } from '../get-last-order-child'
import { GetPageElementService } from '../get-page-element'
import { CreatePageElementInput } from './create-page-element.input'
import { CreatePageElementRequest } from './create-page-element.request'

interface ValidationContext {
  atom: Atom | undefined | null
  parentPageElement: Dgraph_PageElementFragment
}

@Injectable()
export class CreatePageElementService extends DgraphUseCase<
  CreatePageElementRequest,
  PageElement,
  ValidationContext
> {
  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    protected readonly dgraphProvider: DgraphProvider,
    private getPageElementService: GetPageElementService,
    private getLastOrderChildService: GetLastOrderChildService,
    private getAtomService: GetAtomService,
    private pageElementGuardService: PageElementGuardService,
  ) {
    super(dgraphProvider)
  }

  protected async executeTransaction(
    { input, currentUser }: CreatePageElementRequest,
    txn: Txn,
    { parentPageElement }: ValidationContext,
  ) {
    const order = await this.getOrder(input)

    const mutationResult = await txn.mutate({
      setNquads: CreatePageElementService.createMutation(
        { ...input, order },
        parentPageElement.page.id,
      ),
    })

    await txn.commit()

    const uid = mutationResult.data.uids.element

    if (!uid) {
      throw CreatePageElementService.createError()
    }

    const pageElement = await this.getPageElementService.execute({
      input: {
        pageElementId: uid,
      },
      currentUser,
    })

    if (!pageElement) {
      throw CreatePageElementService.createError()
    }

    return pageElement
  }

  private static createMutation(
    { parentPageElementId, order, name, atomId }: CreatePageElementInput,
    pageId: string,
  ) {
    return `
      _:element <dgraph.type> "PageElement" .
      _:element <PageElement.name> "${name}" .
      _:element <PageElement.parent> <${parentPageElementId}> .
      _:element <PageElement.page> <${pageId}> .
      <${parentPageElementId}> <PageElement.children> _:element (order=${order}) .
      ${atomId ? `_:element <PageElement.atom> <${atomId}> .` : ''}
      `
  }

  private static createError() {
    return new Error('Error while creating page element')
  }

  private async getOrder(request: CreatePageElementInput): Promise<number> {
    const { order, parentPageElementId } = request

    if (order) {
      return order
    }

    //if we don't have order - put it last
    const lastOrderChild = await this.getLastOrderChildService.execute({
      pageElementId: parentPageElementId,
    })

    if (lastOrderChild && typeof lastOrderChild.order === 'number') {
      return lastOrderChild.order + 1
    }

    return 0
  }

  protected async validate({
    input: { parentPageElementId, atomId },
    currentUser,
  }: CreatePageElementRequest) {
    const { pageElement: parentPageElement } =
      await this.pageElementGuardService.validate(
        parentPageElementId,
        currentUser,
      )

    let atom: Atom | null | undefined

    if (atomId) {
      atom = await this.getAtomService.execute({ atomId })

      if (!atom) {
        throw new Error('Atom not found')
      }
    }

    return {
      atom,
      parentPageElement,
    }
  }
}

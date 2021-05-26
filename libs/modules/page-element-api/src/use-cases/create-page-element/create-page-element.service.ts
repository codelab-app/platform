import { DGraphService, DgraphUseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { PageElement } from '../../models/'
import { GetLastOrderChildService } from '../get-last-order-child'
import { GetPageElementService } from '../get-page-element'
import { ValidatePageElementService } from '../validate-page-element/validate-page-element.service'
import { CreatePageElementInput } from './create-page-element.input'

@Injectable()
export class CreatePageElementService extends DgraphUseCase<
  CreatePageElementInput,
  PageElement
> {
  constructor(
    dgraph: DGraphService,
    private getPageElementService: GetPageElementService,
    private getLastOrderChildService: GetLastOrderChildService,
    private validatePageElementService: ValidatePageElementService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: CreatePageElementInput,
    txn: Txn,
  ) {
    await this.validatePageElementService.execute(request)

    const order = await this.getOrder(request)

    const mutationResult = await txn.mutate({
      setNquads: `
          _:element <dgraph.type> "PageElement" .
          _:element <PageElement.name> "${request.name}" .
          _:element <PageElement.parent> <${request.parentPageElementId}> .
          <${request.parentPageElementId}> <PageElement.children> _:element (order=${order}) .
          _:element <PageElement.atom> <${request.atomId}> .
      `,
    })

    await txn.commit()

    const uid = mutationResult.data.uids.element

    if (!uid) {
      throw CreatePageElementService.createError()
    }

    const pageElement = await this.getPageElementService.execute({
      pageElementId: uid,
    })

    if (!pageElement) {
      throw CreatePageElementService.createError()
    }

    return pageElement
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

    if (lastOrderChild && lastOrderChild.order) {
      return lastOrderChild.order + 1
    }

    return 0
  }
}

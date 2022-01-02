import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import { IElement, IUser } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { ElementValidator } from '../../../application/element.validator'
import { CreateElementService } from '../create-element'
import { ElementMutationFactory } from '../create-element/element-mutation.factory'
import { GetElementGraphService } from '../get-element-graph'
import { GetElementParentService } from '../get-element-parent'
import { MoveElementService } from '../move-element'
import { ConvertElementToComponentRequest } from './convert-element-to-component.request'

@Injectable()
export class ConvertElementToComponentService extends DgraphUseCase<ConvertElementToComponentRequest> {
  constructor(
    dgraph: DgraphRepository,
    private elementValidator: ElementValidator,
    private createElementService: CreateElementService,
    private getElementParentService: GetElementParentService,
    private moveElementService: MoveElementService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: ConvertElementToComponentRequest,
    txn: Txn,
  ) {
    const {
      input: { elementId },
      currentUser,
    } = request

    await this.validate(request)

    // PS. yes, this can be done with an upsert block, and that would be faster,
    // but it's easier to understand this way, 2 steps won't slow it down a lot,
    // and most important - we reuse all the business logic in the used services

    // Get the element so we can get its name properly
    const targetElement = await this.dgraph.transactionWrapper((txn1) =>
      this.dgraph.getOneOrThrowNamed<IElement>(
        txn1,
        `{${GetElementGraphService.singleElementQuery(
          `uid(${elementId})`,
          'query',
        )}}`,
        'query',
      ),
    )

    // Add componentTag to the target element, effecticely making it a component
    await this.attachComponentTag(targetElement, currentUser, txn)

    // Add an intermediate element between the parent and the new component, which will act as the component instance

    const elementParent = await this.getElementParentService.execute({
      elementId,
    })

    await this.createElementService.execute({
      input: {
        name: targetElement.name ?? undefined,
        parentElementId: elementParent?.parentId,
        instanceOfComponentId: targetElement.id,
      },
      currentUser,
    })

    // Delete the old parent-child relation
    await this.moveElementService.execute({
      input: {
        elementId: targetElement.id,
        moveData: {
          parentElementId: undefined,
          order: 0,
        },
      },
      currentUser,
    })
  }

  protected async attachComponentTag(
    element: IElement,
    currentUser: Maybe<IUser>,
    txn: Txn,
  ) {
    const name =
      element.name ??
      element.atom?.name ??
      (element.atom?.type && pascalCaseToWords(element.atom?.type)) ??
      'My component'

    if (element.componentTag) {
      return
    }

    const mutation = ElementMutationFactory.componentTagJson(currentUser, name)

    await this.dgraph.executeMutation(txn, {
      setJson: {
        uid: element.id,
        componentTag: mutation,
      },
    })
  }

  protected async validate({
    input: { elementId },
    currentUser,
  }: ConvertElementToComponentRequest): Promise<void> {
    await this.elementValidator.existsAndIsOwnedBy(elementId, currentUser)
  }
}

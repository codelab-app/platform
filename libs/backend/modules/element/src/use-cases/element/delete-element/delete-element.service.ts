import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphElement,
  DgraphEntityType,
  DgraphRepository,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { ElementValidator } from '../../../application/element.validator'
import { DeleteElementRequest } from './delete-element.request'

/**
 * Deletes an element and all the descending elements and their props
 */
@Injectable()
export class DeleteElementService extends DgraphUseCase<DeleteElementRequest> {
  constructor(
    dgraph: DgraphRepository,
    private elementValidator: ElementValidator,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: DeleteElementRequest,
    txn: Txn,
  ): Promise<void> {
    const {
      input: { elementId },
    } = request

    const validationContext = await this.validate(request)

    const parentId =
      validationContext.element && validationContext.element['~children']
        ? validationContext.element['~children'][0].uid
        : undefined

    await this.dgraph.executeUpsertDeleteAll(
      txn,
      (query) =>
        query
          .setUidFunc(elementId)
          .addTypeFilterDirective(DgraphEntityType.Element)
          .addJsonFields<DgraphElement>({
            children: true,
            props: true,
          }),
      parentId
        ? { delete: `<${parentId}> <children> <${elementId}> .` }
        : undefined,
    )
  }

  protected async validate({
    currentUser,
    input: { elementId },
  }: DeleteElementRequest) {
    const result = await this.elementValidator.existsAndIsOwnedBy(
      elementId,
      currentUser,
    )

    try {
      await this.elementValidator.isNotRoot(elementId)
    } catch (e: any) {
      if (e.message.toLowerCase().includes('root')) {
        throw new Error("Can't delete root element")
      }
    }

    return result
  }
}

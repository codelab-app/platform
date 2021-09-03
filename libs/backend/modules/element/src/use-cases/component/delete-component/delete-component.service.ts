import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphElement,
  DgraphEntity,
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphRepository,
  DgraphTree,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { ComponentValidator } from '../../../domain/component/component.validator'
import { DeleteComponentRequest } from './delete-component.request'

@Injectable()
export class DeleteComponentService extends DgraphUseCase<DeleteComponentRequest> {
  constructor(
    protected readonly dgraph: DgraphRepository,
    private componentValidator: ComponentValidator,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: DeleteComponentRequest,
    txn: Txn,
  ): Promise<void> {
    const {
      input: { componentId },
    } = request

    await this.validate(request)

    const elements = await this.getAllReferencingElements(componentId)
    console.log('---------------', elements)

    // Delete all references to the component
    const deleteElementComponent = elements.reduce(
      (acc, elementId) => `
      ${acc}
      <${elementId}> <component> <${componentId}> .
    `,
      '',
    )

    // We need to delete related elements and props too,
    // otherwise they will become inaccessible garbage
    // So perform a Upsert mutation which will query for the ids of the page, all elements and their props and then delete them

    await this.dgraph.executeUpsertDeleteAll(
      txn,
      (q) =>
        q
          .addJsonFields<DgraphTree<any, any> & DgraphElement>({
            root: true,
            children: true,
            props: true,
          })
          .setUidFunc(componentId),
      { delete: deleteElementComponent },
    )
  }

  protected async validate({ input: { componentId } }: DeleteComponentRequest) {
    return await this.componentValidator.exists(componentId)
  }

  /** Returns the ids of all elements referencing the component*/
  private async getAllReferencingElements(componentId: string) {
    return this.dgraph.transactionWrapper((txn) =>
      this.dgraph
        .getAll<{
          '~component': Array<DgraphEntity<any>>
        }>(
          txn,
          new DgraphQueryBuilder()
            .setUidFunc(componentId)
            .addJsonReverseFields<DgraphElement>({
              [`~component @filter(type(${DgraphEntityType.Element}))`]: {
                uid: true,
              },
            }),
        )
        .then((r) =>
          r.flatMap((component) => component['~component']).map((e) => e.uid),
        ),
    )
  }
}

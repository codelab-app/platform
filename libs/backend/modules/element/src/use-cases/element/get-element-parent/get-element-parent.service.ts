import {
  DgraphElement,
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphQueryField,
  DgraphUseCase,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetElementParentInput } from './get-element-parent.input'

/**
 * Returns the parent of the requested element or null if there is not parent
 */
@Injectable()
export class GetElementParentService extends DgraphUseCase<
  GetElementParentInput,
  DgraphElement | null
> {
  protected executeTransaction(
    request: GetElementParentInput,
    txn: Txn,
  ): Promise<DgraphElement | null> {
    return this.dgraph
      .getOne<{ '~children': Array<DgraphElement> }>(
        txn,
        this.createQuery(request),
      )
      .then((p) => (p && p['~children']?.length ? p['~children'][0] : null))
  }

  private createQuery({ elementId }: GetElementParentInput) {
    return new DgraphQueryBuilder()
      .setUidFunc(elementId)
      .addTypeFilterDirective(DgraphEntityType.Element)
      .addFields(
        new DgraphQueryField('~children')
          .addBaseInnerFields()
          .addExpandAll((f) =>
            f
              .addBaseInnerFields()
              .addExpandAll((f2) => f2.addBaseInnerFields().addExpandAll()),
          ),
      )
  }
}

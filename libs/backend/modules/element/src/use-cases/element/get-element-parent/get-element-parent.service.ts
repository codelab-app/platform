import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphQueryField,
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
  any | null
> {
  protected executeTransaction(
    request: GetElementParentInput,
    txn: Txn,
  ): Promise<any | null> {
    return this.dgraph
      .getOne<{ '~children': Array<any> }>(txn, this.createQuery(request))
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

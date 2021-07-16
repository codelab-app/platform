import {
  DgraphElement,
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphQueryField,
  DgraphUseCase,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
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
    return this.dgraph.getOne<DgraphElement>(txn, this.createQuery(request))
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

import {
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphRepository,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ComponentValidator {
  constructor(private dgraph: DgraphRepository) {}

  /**
   * Throws error
   * if the component doesn't exist
   */
  async exists(componentId: string) {
    await this.dgraph.transactionWrapper((txn) =>
      this.dgraph.getOneOrThrow(
        txn,
        this.createQuery(componentId),
        () => new Error('Component not found'),
      ),
    )
  }

  private createQuery(componentId: string) {
    return new DgraphQueryBuilder()
      .setUidFunc(componentId)
      .addTypeFilterDirective(DgraphEntityType.Component)
      .addBaseFields()
  }
}

import {
  createEntityMutation,
  DgraphEntityType,
  mapIdToUid,
} from '@codelab/backend/infra'
import { Mutation, Txn } from 'dgraph-js-http'
import { DgraphCreateUseCase } from './dgraph-create-use-case'

export abstract class DgraphEntityCreateUseCase<
  TUseCaseRequestPort,
  TEntity extends { id: string },
> extends DgraphCreateUseCase<TUseCaseRequestPort> {
  protected abstract entityType: DgraphEntityType | Array<DgraphEntityType>

  protected async executeTransaction(request: TUseCaseRequestPort, txn: Txn) {
    return this.dgraph.create(txn, (blankNodeUid) =>
      this.createMutation(request, blankNodeUid),
    )
  }

  protected async createMutation(
    request: TUseCaseRequestPort,
    blankNodeUid: string,
  ): Promise<Mutation> {
    const entityRaw = await this.entityFactory(request)

    if (!this.schema) {
      throw new Error(`Define schema property in ${this.constructor.name}`)
    }

    if (!this.entityType) {
      throw new Error(`Define entityType property in ${this.constructor.name}`)
    }

    const entity = this.schema.parse(entityRaw)

    const mutation = createEntityMutation(this.entityType, {
      uid: blankNodeUid,
      ...mapIdToUid(entity),
    })

    const extraMutations = await this.extraMutations(
      request,
      entity,
      blankNodeUid,
    )

    return {
      setJson: [
        mutation,
        ...(Array.isArray(extraMutations) ? extraMutations : []),
      ],
    }
  }

  /**
   * Override with logic to construct an entity instance
   * @param request
   */
  abstract entityFactory(
    request: TUseCaseRequestPort,
  ): Omit<TEntity, 'id'> | Promise<Omit<TEntity, 'id'>>

  /**
   * Override if you want to provide other setJson mutations
   */
  extraMutations(
    request: TUseCaseRequestPort,
    entity: TEntity,
    entityBlankNodeUid: string,
  ):
    | Record<string, any>
    | Array<Record<string, any>>
    | void
    | Promise<Record<string, any> | Array<Record<string, any>> | void> {
    return void 0
  }
}

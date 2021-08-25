import {
  DgraphEntityType,
  DgraphFilters,
  DgraphHook,
  DgraphQueryBuilder,
  DgraphQueryField,
  DgraphUseCase,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { RemoveHookFromElementRequest } from './remove-hook-from-element.request'

@Injectable()
export class RemoveHookFromElementService extends DgraphUseCase<RemoveHookFromElementRequest> {
  protected async executeTransaction(
    request: RemoveHookFromElementRequest,
    txn: Txn,
  ) {
    await this.validate(request)

    const { elementId, hookId } = request.input
    await this.dgraph.deleteEntity(
      txn,
      hookId,
      `<${elementId}> <hooks> <${hookId}> .`,
    )
  }

  protected async validate(request: RemoveHookFromElementRequest) {
    const { elementId, hookId } = request.input

    const elementWithHook = await this.dgraph.transactionWrapper((txn) => {
      return this.dgraph.getOneOrThrow<{
        hooks: Array<Pick<DgraphHook, 'uid'>>
      }>(
        txn,
        new DgraphQueryBuilder()
          .addTypeFilterDirective(DgraphEntityType.Element)
          .setUidFunc(elementId)
          .addFields(
            new DgraphQueryField('hooks')
              .addFilter(
                DgraphFilters.Uid(hookId).and(
                  DgraphFilters.Type(DgraphEntityType.Hook),
                ),
              )
              .addBaseInnerFields(),
          ),
        () => new Error('Element not found'),
      )
    })

    if (
      elementWithHook.hooks.length === 0 ||
      elementWithHook.hooks[0].uid !== hookId
    ) {
      throw new Error('Invalid hook id')
    }
  }
}

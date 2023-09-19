import type {
  CodeAction,
  CodeActionOptions,
  CodeActionWhere,
} from '@codelab/backend/abstract/codegen'
import {
  actionSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { ICodeActionDTO } from '@codelab/shared/abstract/core'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CodeActionRepository extends AbstractRepository<
  ICodeActionDTO,
  CodeAction,
  CodeActionWhere,
  CodeActionOptions
> {
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
    protected validationService: ValidationService,
  ) {
    super(traceService, validationService)
  }

  protected async _find({
    options,
    where,
  }: {
    where?: CodeActionWhere
    options?: CodeActionOptions
  }) {
    return await (
      await this.ogmService.CodeAction
    ).find({
      options,
      selectionSet: actionSelectionSet,
      where,
    })
  }

  protected async _add(actions: Array<ICodeActionDTO>) {
    return (
      await (
        await this.ogmService.CodeAction
      ).create({
        input: actions.map(({ store, ...action }) => ({
          ...action,
          store: connectNodeId(store.id),
        })),
      })
    ).codeActions
  }

  protected async _update(
    { id, store, ...action }: ICodeActionDTO,
    where: CodeActionWhere,
  ) {
    return (
      await (
        await this.ogmService.CodeAction
      ).update({
        update: {
          ...action,
          store: reconnectNodeId(store.id),
        },
        where,
      })
    ).codeActions[0]
  }
}

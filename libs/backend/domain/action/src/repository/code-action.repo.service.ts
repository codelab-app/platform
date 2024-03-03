import type {
  CodeAction,
  CodeActionOptions,
  CodeActionWhere,
} from '@codelab/backend/abstract/codegen'
import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  codeActionSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { ICodeActionDto } from '@codelab/shared/abstract/core'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CodeActionRepository extends AbstractRepository<
  ICodeActionDto,
  CodeAction,
  CodeActionWhere,
  CodeActionOptions
> {
  constructor(
    private ogmService: OgmService,
    protected override traceService: TraceService,
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(traceService, validationService, loggerService)
  }

  protected async _addMany(actions: Array<ICodeActionDto>) {
    return (
      await (
        await this.ogmService.CodeAction
      ).create({
        input: actions.map(({ __typename, store, ...action }) => ({
          ...action,
          store: connectNodeId(store.id),
        })),
      })
    ).codeActions
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
      selectionSet: `{ ${codeActionSelectionSet} }`,
      where,
    })
  }

  protected async _update(
    { id, store, ...action }: ICodeActionDto,
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

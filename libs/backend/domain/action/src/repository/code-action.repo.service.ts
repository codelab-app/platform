import type {
  CodeAction,
  CodeActionModel,
  CodeActionOptions,
  CodeActionWhere,
} from '@codelab/backend/abstract/codegen'
import {
  actionSelectionSet,
  OGMService,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { ICodeActionDTO } from '@codelab/shared/abstract/core'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'
import type { OnModuleInit } from '@nestjs/common'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CodeActionRepository
  extends AbstractRepository<
    ICodeActionDTO,
    CodeAction,
    CodeActionWhere,
    CodeActionOptions
  >
  implements OnModuleInit
{
  private CodeAction!: CodeActionModel

  constructor(private ogmService: OGMService) {
    super()
  }

  onModuleInit() {
    this.CodeAction = this.ogmService.getModel('CodeAction')
  }

  async _find({
    options,
    where,
  }: {
    where?: CodeActionWhere
    options?: CodeActionOptions
  }) {
    return await (
      await this.CodeAction
    ).find({
      options,
      selectionSet: actionSelectionSet,
      where,
    })
  }

  protected async _add(actions: Array<ICodeActionDTO>) {
    return (
      await (
        await this.CodeAction
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
        await this.CodeAction
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

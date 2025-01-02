import type { ICodeActionDto, INodeType } from '@codelab/shared/abstract/core'
import type {
  CodeActionOptions,
  CodeActionWhere,
} from '@codelab/shared/infra/gql'

import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { ValidationService } from '@codelab/backend/infra/adapter/validation'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { CodeActionFragment } from '@codelab/shared/infra/gql'
import { codeActionMapper } from '@codelab/shared-domain-module/action'
import {
  actionCreateApi,
  actionFindApi,
  actionUpdateApi,
} from '@codelab/shared-domain-module/store'
import { Injectable } from '@nestjs/common'

const { CreateCodeActions } = actionCreateApi()
const { UpdateCodeActions } = actionUpdateApi()
const { GetActions } = actionFindApi()

@Injectable()
export class CodeActionRepository extends AbstractRepository<
  INodeType.CodeAction,
  ICodeActionDto,
  CodeActionFragment,
  CodeActionWhere,
  CodeActionOptions
> {
  constructor(
    protected override validationService: ValidationService,
    protected override loggerService: PinoLoggerService,
  ) {
    super(validationService, loggerService)
  }

  protected async _addMany(actions: Array<ICodeActionDto>) {
    const {
      createCodeActions: { codeActions },
    } = await CreateCodeActions({
      input: actions.map((action) => codeActionMapper.toCreateInput(action)),
    })

    return codeActions
  }

  protected async _find({
    options,
    where,
  }: {
    where?: CodeActionWhere
    options?: CodeActionOptions
  }) {
    const { codeActions } = await GetActions({ codeActionWhere: where })

    return codeActions
  }

  protected async _update(dto: ICodeActionDto, where: CodeActionWhere) {
    const {
      updateCodeActions: { codeActions },
    } = await UpdateCodeActions({
      update: codeActionMapper.toUpdateInput(dto),
      where,
    })

    return codeActions[0]
  }
}

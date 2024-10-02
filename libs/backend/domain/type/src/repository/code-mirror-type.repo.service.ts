import type {
  CodeMirrorType,
  CodeMirrorTypeOptions,
  CodeMirrorTypeWhere,
} from '@codelab/backend/abstract/codegen'
import type { ICodeMirrorTypeDto } from '@codelab/shared/abstract/core'
import type { BaseTypeUniqueWhere } from '@codelab/shared/abstract/types'

import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  exportCodeMirrorTypeSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { connectOwner } from '@codelab/shared/domain'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CodeMirrorTypeRepository extends AbstractRepository<
  ICodeMirrorTypeDto,
  CodeMirrorType,
  CodeMirrorTypeWhere,
  CodeMirrorTypeOptions
> {
  constructor(
    private ogmService: OgmService,

    protected override loggerService: CodelabLoggerService,
    protected override validationService: ValidationService,

    protected authService: AuthDomainService,
  ) {
    super(validationService, loggerService)
  }

  protected async _addMany(codemirrorTypes: Array<ICodeMirrorTypeDto>) {
    return (
      await (
        await this.ogmService.CodeMirrorType
      ).create({
        input: codemirrorTypes.map(({ __typename, ...type }) => ({
          ...type,
          owner: connectOwner(this.authService.currentUser),
        })),
      })
    ).codeMirrorTypes
  }

  protected async _find({
    options,
    where,
  }: {
    where?: CodeMirrorTypeWhere
    options?: CodeMirrorTypeOptions
  }) {
    return await (
      await this.ogmService.CodeMirrorType
    ).find({
      options,
      selectionSet: `{ ${exportCodeMirrorTypeSelectionSet} }`,
      where,
    })
  }

  protected async _update(
    { __typename, id, language, name }: ICodeMirrorTypeDto,
    where: BaseTypeUniqueWhere,
  ) {
    return (
      await (
        await this.ogmService.CodeMirrorType
      ).update({
        update: { name },
        where,
      })
    ).codeMirrorTypes[0]
  }
}

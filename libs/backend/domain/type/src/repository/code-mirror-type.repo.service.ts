import type {
  ICodeMirrorTypeDto,
  INodeType,
} from '@codelab/shared/abstract/core'
import type { BaseTypeUniqueWhere } from '@codelab/shared/abstract/types'
import type {
  CodeMirrorTypeOptions,
  CodeMirrorTypeWhere,
} from '@codelab/shared/infra/gql'

import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { CodeMirrorTypeFragment } from '@codelab/shared/infra/gql'
import { Validator } from '@codelab/shared/infra/typebox'
import {
  codeMirrorTypeMapper,
  createTypeApi,
  findTypeApi,
  updateTypeApi,
} from '@codelab/shared-domain-module/type'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CodeMirrorTypeRepository extends AbstractRepository<
  INodeType.CodeMirrorType,
  ICodeMirrorTypeDto,
  CodeMirrorTypeFragment,
  CodeMirrorTypeWhere,
  CodeMirrorTypeOptions
> {
  constructor(
    protected override loggerService: PinoLoggerService,

    protected authService: AuthDomainService,
  ) {
    super(loggerService)
  }

  protected async _addMany(codemirrorTypes: Array<ICodeMirrorTypeDto>) {
    const {
      types: { types },
    } = await createTypeApi().CreateCodeMirrorTypes({
      input: codemirrorTypes.map((codemirrorType) =>
        codeMirrorTypeMapper.toCreateInput(codemirrorType),
      ),
    })

    return types
  }

  protected async _find({
    options,
    where,
  }: {
    where?: CodeMirrorTypeWhere
    options?: CodeMirrorTypeOptions
  }) {
    const { types } = await findTypeApi().GetCodeMirrorTypes({
      options,
      where,
    })

    return types
  }

  protected async _update(
    codemirrorType: ICodeMirrorTypeDto,
    where: BaseTypeUniqueWhere,
  ) {
    const {
      types: { types },
    } = await updateTypeApi().UpdateCodeMirrorTypes({
      update: codeMirrorTypeMapper.toUpdateInput(codemirrorType),
      where,
    })

    return types[0]
  }
}

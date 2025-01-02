import type { IAuthGuardDto, INodeType } from '@codelab/shared/abstract/core'

import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { ValidationService } from '@codelab/backend/infra/adapter/validation'
import { AbstractRepository } from '@codelab/backend/infra/core'
import {
  AuthGuardFragment,
  AuthGuardOptions,
  AuthGuardWhere,
} from '@codelab/shared/infra/gql'
import {
  authGuardApi,
  authGuardMapper,
} from '@codelab/shared-domain-module/auth-guard'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthGuardRepository extends AbstractRepository<
  INodeType.AuthGuard,
  IAuthGuardDto,
  AuthGuardFragment,
  AuthGuardWhere,
  AuthGuardOptions
> {
  constructor(
    protected override validationService: ValidationService,
    protected override loggerService: PinoLoggerService,
  ) {
    super(validationService, loggerService)
  }

  protected async _addMany(authGuards: Array<IAuthGuardDto>) {
    const {
      createAuthGuards: { authGuards: createdAuthGuards },
    } = await authGuardApi().CreateAuthGuards({
      input: authGuards.map((authGuard) =>
        authGuardMapper.toCreateInput(authGuard),
      ),
    })

    return createdAuthGuards
  }

  protected async _find({
    options,
    where,
  }: {
    where?: AuthGuardWhere
    options?: AuthGuardOptions
  }) {
    const { items } = await authGuardApi().GetAuthGuards({
      options,
      where,
    })

    return items
  }

  protected async _update(authGuard: IAuthGuardDto, where: AuthGuardWhere) {
    const {
      updateAuthGuards: { authGuards },
    } = await authGuardApi().UpdateAuthGuard({
      update: authGuardMapper.toUpdateInput(authGuard),
      where,
    })

    return authGuards[0]
  }
}

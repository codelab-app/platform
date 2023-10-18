import {
  type AuthGuard,
  type AuthGuardOptions,
  type AuthGuardWhere,
} from '@codelab/backend/abstract/codegen'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import {
  authGuardSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IAuthGuardDTO } from '@codelab/shared/abstract/core'
import {
  connectNodeId,
  connectOwner,
  reconnectNodeId,
} from '@codelab/shared/domain/mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthGuardRepository extends AbstractRepository<
  IAuthGuardDTO,
  AuthGuard,
  AuthGuardWhere,
  AuthGuardOptions
> {
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
    protected validationService: ValidationService,
    private authService: AuthDomainService,
  ) {
    super(traceService, validationService)
  }

  protected async _add(authGuards: Array<IAuthGuardDTO>) {
    return (
      await (
        await this.ogmService.AuthGuard
      ).create({
        input: authGuards.map(
          ({ config, id, name, resource, responseTransformer }) => ({
            config: connectNodeId(config.id),
            id,
            name,
            owner: connectOwner(this.authService.currentUser),
            resource: connectNodeId(resource.id),
            responseTransformer,
          }),
        ),
      })
    ).authGuards
  }

  protected async _find({
    options,
    where,
  }: {
    where?: AuthGuardWhere
    options?: AuthGuardOptions
  }) {
    return await (
      await this.ogmService.AuthGuard
    ).find({
      options,
      selectionSet: `{ ${authGuardSelectionSet} }`,
      where,
    })
  }

  protected async _update({ config, name, resource }: IAuthGuardDTO) {
    return (
      await (
        await this.ogmService.AuthGuard
      ).update({
        update: {
          config: reconnectNodeId(config.id),
          name,
          resource: reconnectNodeId(resource.id),
        },
      })
    ).authGuards[0]
  }
}

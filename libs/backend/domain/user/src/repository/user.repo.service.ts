import type {
  User,
  UserOptions,
  UserWhere,
} from '@codelab/backend/abstract/codegen'
import {
  OgmService,
  userSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IUserDTO } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserRepository extends AbstractRepository<
  IUserDTO,
  User,
  UserWhere,
  UserOptions
> {
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
    protected validationService: ValidationService,
  ) {
    super(traceService, validationService)
  }

  protected async _add(users: Array<IUserDTO>) {
    return (
      await (
        await this.ogmService.User
      ).create({
        input: users.map(({ apps, auth0Id, email, id, roles, username }) => ({
          auth0Id,
          email,
          id,
          roles,
          username,
        })),
      })
    ).users
  }

  protected async _find({
    options,
    where,
  }: {
    options?: UserOptions
    where?: UserWhere
  }) {
    return await (
      await this.ogmService.User
    ).find({
      options,
      selectionSet: `{ ${userSelectionSet} }`,
      where,
    })
  }

  protected async _update(
    { apps, auth0Id, email, id, roles, username }: IUserDTO,
    where: UserWhere,
  ) {
    return (
      await (
        await this.ogmService.User
      ).update({
        update: {
          email,
          roles,
          username,
        },
        where,
      })
    ).users[0]
  }
}

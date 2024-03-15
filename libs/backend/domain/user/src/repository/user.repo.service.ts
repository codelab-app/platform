import type {
  User,
  UserOptions,
  UserWhere,
} from '@codelab/backend/abstract/codegen'
import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  OgmService,
  userSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'

import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IUserDto } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserRepository extends AbstractRepository<
  IUserDto,
  User,
  UserWhere,
  UserOptions
> {
  constructor(
    private ogmService: OgmService,

    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
  }

  protected async _addMany(users: Array<IUserDto>) {
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
    { apps, auth0Id, email, id, roles, username }: IUserDto,
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

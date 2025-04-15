import type { TestingModule } from '@nestjs/testing'

import { AuthDomainService } from '@codelab/backend-domain-shared-auth'
import { UserDomainService } from '@codelab/backend-domain-user'
import { DatabaseService } from '@codelab/backend-infra-adapter-neo4j-driver'
import { userDto } from '@codelab/shared-data-test'

export const initUserServices = async (module: TestingModule) => {
  const userDomainService = module.get(UserDomainService)
  const authService = module.get(AuthDomainService)
  const owner = userDto

  return {
    authService,
    owner,
    userDomainService,
  }
}

export const resetAndSeedDatabase = async (
  module: TestingModule,
  userDomainService: UserDomainService,
  owner: typeof userDto,
) => {
  const databaseService = module.get(DatabaseService)

  await databaseService.resetDatabase()
  await userDomainService.seedUser(owner)
}

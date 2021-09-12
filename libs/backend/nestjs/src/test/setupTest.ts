import { DgraphService } from '@codelab/backend/infra'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { GqlAuthGuard } from '@codelab/backend/modules/user'
import { testAuth0Id, testUserUid } from '@codelab/backend/shared/generic'
import { Role, User } from '@codelab/shared/abstract/core'
import {
  DynamicModule,
  ExecutionContext,
  ForwardReference,
  INestApplication,
  Type,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Test, TestingModuleBuilder } from '@nestjs/testing'
import { InfrastructureModule } from '../infrastructure.module'

type NestModule =
  | Type
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference

interface TestOptions {
  role: Role
  resetDb?: boolean
}

export const setupTestModule = async (
  nestModules: Array<NestModule>,
  options: TestOptions,
  testModuleCallback: (
    testModule: TestingModuleBuilder,
  ) => TestingModuleBuilder = (x) => x,
): Promise<INestApplication> => {
  const { role = Role.Guest, resetDb = true } = options

  let testModuleBuilder: TestingModuleBuilder = await Test.createTestingModule({
    imports: [InfrastructureModule, ...nestModules],
  })

  testModuleBuilder = testModuleCallback(testModuleBuilder)

  const username = process.env.AUTH0_CYPRESS_USERNAME
  const userUid = testUserUid
  const auth0Id = testAuth0Id

  if (!username) {
    throw new Error('Missing Auth0 username')
  }

  // Mock Auth0 authentication & authorization
  if (role !== Role.Guest) {
    /**
     * Override Auth guard return true for checks
     *
     * // TODO: Look into circular dependency
     */
    testModuleBuilder.overrideGuard(GqlAuthGuard).useValue({
      canActivate: (context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context)

        // TODO: Since mocking GqlAuthGuard doesn't trigger jwt.strategy, we need a way to add roles to user
        const user: User = {
          id: userUid,
          auth0Id: auth0Id,
          roles: [Role.User],
        }

        // This will override our @CurrentUser annotation
        ctx.getContext().req.user = user

        return true
      },
    })
  }

  const testModule = await testModuleBuilder.compile()
  const app = testModule.createNestApplication()

  await app.init()

  if (resetDb) {
    // await getDgraphProviderFromTestModule(app).updateDqlSchema()
    await getDgraphProviderFromTestModule(app).resetData()
  }

  return app
}

export const getDgraphProviderFromTestModule = (app: INestApplication) => {
  return app.get<DgraphService>(DgraphService)
}

export const teardownTestModule = async (app: INestApplication) => {
  await app.close()
}

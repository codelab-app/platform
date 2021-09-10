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
import { GqlAuthGuard } from '../../adapters'
import { InfrastructureModule } from '../../infrastructure.module'
import { auth0Config, Auth0Tokens, DgraphService } from '../../ports'

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
    providers: [
      {
        provide: Auth0Tokens.Auth0Config,
        useValue: auth0Config(),
      },
    ],
  })

  testModuleBuilder = testModuleCallback(testModuleBuilder)

  const username = process.env.AUTH0_CYPRESS_USERNAME
  const userUid = '0x01'
  const auth0Id = 'codelab-auth0-id'

  if (!username) {
    throw new Error('Missing Auth0 username')
  }

  // Mock Auth0 authentication & authorization
  if (role !== Role.Guest) {
    /**
     * Override Auth guard return true for checks
     */
    testModuleBuilder.overrideGuard(GqlAuthGuard).useValue({
      canActivate: (context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context)

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

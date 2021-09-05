import { Role } from '@codelab/shared/abstract/core'
import {
  DynamicModule,
  ExecutionContext,
  ForwardReference,
  INestApplication,
  ShutdownSignal,
  Type,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Test, TestingModuleBuilder } from '@nestjs/testing'
import { GqlAuthGuard, JwtPayload } from '../../adapters'
import { InfrastructureModule } from '../../infrastructure.module'
import { DgraphService } from '../../ports'

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

  // Mock Auth0 authentication & authorization
  if (role !== Role.Guest) {
    testModuleBuilder.overrideGuard(GqlAuthGuard).useValue({
      canActivate: (context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context)

        const payload: JwtPayload = {
          'https://api.codelab.ai/jwt/claims': {
            email: 'test-user@codelab.com',
            roles: [Role.User],
          },
          iss: 'codelab',
          sub: 'codelab-test-user-id',
          aud: ['https://api.codelab.ai'],
          iat: Date.now(),
          exp: Date.now() + 1 * 60 * 60 * 1000,
          azp: 'HgguS961i58k3TOHwS5b4ZW4OevBGibp',
          gty: 'client-credentials',
        }

        // This will override our @CurrentUser annotation
        ctx.getContext().req.user = payload

        return true
      },
    })
  }

  const testModule = await testModuleBuilder.compile()
  const app = testModule.createNestApplication()
  app.enableShutdownHooks([ShutdownSignal.SIGTERM, ShutdownSignal.SIGINT])

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

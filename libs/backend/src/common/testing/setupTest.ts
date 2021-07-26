import {
  DynamicModule,
  ExecutionContext,
  ForwardReference,
  INestApplication,
  Type,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ExpressAdapter } from '@nestjs/platform-express'
import { Test, TestingModuleBuilder } from '@nestjs/testing'
import { GqlAuthGuard, JwtPayload, Role } from '../../adapters/auth'
import {
  DgraphProvider,
  DgraphTokens,
  InfrastructureModule,
} from '../../infrastructure'

type NestModule =
  | Type<any>
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference

interface TestOptions {
  role: Role
  resetDb?: boolean
}

const logErrors = (err: any, req: any, res: any, next: any) => {
  console.error(err)
  next(err)
}

export const setupTestModule = async (
  nestModules: Array<NestModule>,
  options: TestOptions,
): Promise<INestApplication> => {
  const { role = Role.GUEST, resetDb = true } = options

  const testModuleBuilder: TestingModuleBuilder =
    await Test.createTestingModule({
      imports: [InfrastructureModule, ...nestModules],
    })

  // Mock Auth0 authentication & authorization
  if (role !== Role.GUEST) {
    testModuleBuilder.overrideGuard(GqlAuthGuard).useValue({
      canActivate: (context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context)

        const payload: JwtPayload = {
          'https://api.codelab.ai/jwt/claims': {
            email: 'test-user@codelab.com',
            roles: [Role.USER],
          },
          iss: 'codelab',
          sub: 'codelab-test-user-id',
          aud: ['https://api.codelab.ai'],
          iat: 1625172039,
          exp: 1627764039,
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

  const app = testModule.createNestApplication(new ExpressAdapter(), {
    // logger: false,
    // logger: ['log', 'error'],
  })

  app.use(logErrors)

  await app.init()

  if (resetDb) {
    await getDgraphProviderFromTestModule(app).resetDb()
  }

  return app
}

export const getDgraphProviderFromTestModule = (app: INestApplication) => {
  return app.get<DgraphProvider>(DgraphTokens.DgraphProvider)
}

export const teardownTestModule = async (app: INestApplication) => {
  await app.close()
}

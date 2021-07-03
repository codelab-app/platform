import { DynamicModule, ExecutionContext, ForwardReference, INestApplication, Type, } from '@nestjs/common'
import { Test, TestingModuleBuilder } from '@nestjs/testing'
import { GqlAuthGuard } from '@codelab/modules/auth-api';
import { GqlExecutionContext } from '@nestjs/graphql';
import { DgraphProvider, DgraphTokens, InfrastructureModule } from '../infrastructure';
import { JwtPayload } from '@codelab/backend/adapters';

type NestModule =
  | Type<any>
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference

export const setupTestModule = async (
  overrideAuth: boolean,
  ...nestModules: Array<NestModule>
): Promise<INestApplication> => {
  let testModuleBuilder: TestingModuleBuilder = await Test.createTestingModule({
    imports: [InfrastructureModule, ...nestModules],
  })

  if (overrideAuth) {
    testModuleBuilder
      .overrideGuard(GqlAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const ctx = GqlExecutionContext.create(context)
          const payload: JwtPayload = {
            'https://api.codelab.ai/jwt/claims': {
              email: 'test-user@codelab.com',
              roles: ['USER']
            },
            'iss': 'codelab',
            'sub': 'codelab-test-user-id',
            'aud': ['https://api.codelab.ai'],
            'iat': 1625172039,
            'exp': 1627764039,
            'azp': 'HgguS961i58k3TOHwS5b4ZW4OevBGibp',
            'gty': 'client-credentials'
          }
          // This will override our @CurrentUser annotation
          ctx.getContext().req.user = payload
          return true
        },
      })
  }
  const testModule = await testModuleBuilder.compile()

  const app = testModule.createNestApplication()

  await app.init()

  await getDgraphProviderFromTestModule(app).resetDb()

  return app
}

export const getDgraphProviderFromTestModule = (app: INestApplication) => {
  return app.get<DgraphProvider>(DgraphTokens.DgraphProvider)
}

export const teardownTestModule = async (app: INestApplication) => {
  await app.close()
}

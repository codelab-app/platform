import { DgraphService, GqlAuthGuard } from '@codelab/backend/infra'
import { testAuth0Id, testUserUid } from '@codelab/backend/shared/generic'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { NestjsModule } from '@codelab/backend/shared/nestjs'
import { IUser, Role } from '@codelab/shared/abstract/core'
import {
  DynamicModule,
  ExecutionContext,
  ForwardReference,
  INestApplication,
  Type,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Test, TestingModuleBuilder } from '@nestjs/testing'
import * as shell from 'shelljs'

export const env = process.env.CI ? 'ci' : 'test'

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
  const { role, resetDb } = options

  let testModuleBuilder: TestingModuleBuilder = await Test.createTestingModule({
    imports: [NestjsModule, ...nestModules],
  })

  testModuleBuilder = testModuleCallback(testModuleBuilder)

  const username = process.env.AUTH0_CYPRESS_USERNAME
  const userUid = testUserUid
  const auth0Id = testAuth0Id

  if (!username) {
    throw new Error('Missing Auth0 username')
  }

  /**
   * Override Auth guard to mock authorization
   *
   * // TODO: Look into circular dependency
   */
  testModuleBuilder.overrideGuard(GqlAuthGuard).useValue({
    canActivate: (context: ExecutionContext) => {
      const ctx = GqlExecutionContext.create(context)

      if (role === Role.Guest) {
        // If we return false, we default to guard's error message. But AuthGuard('jwt), the class we're mocking, returns UnauthorizedException instead
        throw new UnauthorizedException()
      }

      const user: IUser = {
        id: userUid,
        auth0Id: auth0Id,
        roles: [role],
      }

      // This will override our @CurrentUser annotation
      ctx.getContext().req.user = user

      return true
    },
  })

  const testModule = await testModuleBuilder.compile()
  const app = testModule.createNestApplication()

  await app.init()

  if (resetDb) {
    await getDgraphProviderFromTestModule(app).resetData()
    // await getDgraphProviderFromTestModule(app).updateDqlSchema()
  }

  return app
}

export const getDgraphProviderFromTestModule = (app: INestApplication) => {
  return app.get<DgraphService>(DgraphService)
}

export const teardownTestModule = async (app: INestApplication) => {
  await app.close()
}

export const resetData = () => {
  shell.exec(`yarn cli dgraph reset-data --env ${env}`)
}

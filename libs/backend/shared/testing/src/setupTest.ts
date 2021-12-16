import {
  DgraphService,
  GqlAuthGuard,
  LoggerModule,
  TestTransactionManager,
  TransactionManager,
} from '@codelab/backend/infra'
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
  mockTransaction?: boolean
  resetDb?: boolean
}

export const setupSimpleTestModule = async (
  nestModules: Array<NestModule>,
  testModuleCallback: (
    testModule: TestingModuleBuilder,
  ) => TestingModuleBuilder = (x) => x,
) => {
  let testModuleBuilder: TestingModuleBuilder = Test.createTestingModule({
    imports: [LoggerModule, ...nestModules],
  })

  testModuleBuilder = testModuleCallback(testModuleBuilder)

  const testModule = await testModuleBuilder.compile()
  const app = testModule.createNestApplication()

  await app.init()

  return app
}

export const makeTestUser = (role: Role): IUser => ({
  id: testUserUid,
  auth0Id: testAuth0Id,
  roles: [role],
})

export const setupTestModule = async (
  nestModules: Array<NestModule>,
  options: TestOptions,
  testModuleCallback: (
    testModule: TestingModuleBuilder,
  ) => TestingModuleBuilder = (x) => x,
): Promise<INestApplication> => {
  const { role, resetDb, mockTransaction } = options

  const app = await setupSimpleTestModule(
    [NestjsModule, ...nestModules],
    (testModuleBuilder) => {
      testModuleBuilder = testModuleCallback(testModuleBuilder)

      if (mockTransaction) {
        testModuleBuilder
          .overrideProvider(TransactionManager)
          .useClass(TestTransactionManager)
      }

      const username = process.env.AUTH0_CYPRESS_USERNAME

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

          // This will override our @CurrentUser annotation
          ctx.getContext().req.user = makeTestUser(role)

          return true
        },
      })

      return testModuleBuilder
    },
  )

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

export const getTestTransaction = async (app: INestApplication) => {
  const tm = await app.get(TransactionManager)

  return tm.generateTransaction() // In TestTransactionManager, this will resolve the static transaction
}

export const resetData = () => {
  shell.exec(`yarn cli dgraph reset-data --env ${env}`)
}

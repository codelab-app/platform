import {
  DynamicModule,
  ForwardReference,
  INestApplication,
  Type,
} from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { TestInfrastructureModule } from '../framework'
import { DgraphProvider, DgraphTokens } from '../infrastructure'

type NestModule =
  | Type<any>
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference

export const setupTestModule = async (
  app: INestApplication,
  ...nestModules: Array<NestModule>
): Promise<INestApplication> => {
  const testModule = await Test.createTestingModule({
    imports: [TestInfrastructureModule, ...nestModules],
  }).compile()

  app = testModule.createNestApplication()

  await app.init()

  const dgraphProvider = app.get<DgraphProvider>(DgraphTokens.DgraphProvider)
  await dgraphProvider.resetDb()

  return app
}

export const teardownTestModule = async (app: INestApplication) => {
  await app.close()
}

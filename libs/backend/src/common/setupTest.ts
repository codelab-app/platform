import {
  DynamicModule,
  ForwardReference,
  INestApplication,
  Type,
} from '@nestjs/common'
import { Test } from '@nestjs/testing'
import {
  DgraphProvider,
  DgraphTokens,
  InfrastructureModule,
} from '../infrastructure'

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
    imports: [InfrastructureModule, ...nestModules],
  }).compile()

  app = testModule.createNestApplication()

  await app.init()

  const dgraphProvider = getDbFromTestModule(app)
  await dgraphProvider.resetDb()

  return app
}

export const getDbFromTestModule = (app: INestApplication) => {
  return app.get<DgraphProvider>(DgraphTokens.DgraphProvider)
}

export const teardownTestModule = async (app: INestApplication) => {
  await app.close()
}

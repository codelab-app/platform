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

  return app.get<DgraphProvider>(DgraphTokens.DgraphProvider).resetDb()
}

export const teardownTestModule = async (app: INestApplication) => {
  await app.close()
}

import {
  DynamicModule,
  ForwardReference,
  INestApplication,
  Type,
} from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { TestInfrastructureModule } from '../../framework/nestjs/test-infrastructure.module'
import { PrismaDITokens } from '../../infrastructure/persistence/prisma/PrismaDITokens'
import { PrismaService } from '@codelab/backend'

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

  const prismaService: PrismaService = app.get(PrismaDITokens.PrismaService)

  prismaService.resetDb()

  return await app.init()
}

export const teardownTestModule = async (app: INestApplication) => {
  await app.close()
}

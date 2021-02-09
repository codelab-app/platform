import { Logger } from '@nestjs/common'
import { ConfigDITokens } from '../../../framework/nestjs/ConfigDITokens'
import { DatabaseConfig } from '../config/DbConfig'
import { PrismaDITokens } from './PrismaDITokens'
import { PrismaService } from './PrismaService'

export const prismaProviders = [
  {
    provide: PrismaDITokens.PrismaService,
    useFactory: (databaseConfig: DatabaseConfig, logger: Logger) => {
      return new PrismaService(
        {
          datasources: {
            db: {
              url: databaseConfig.PRISMA_DATABASE_URL,
            },
          },
        },
        logger,
      )
    },
    inject: [ConfigDITokens.ConfigService, Logger],
  },
]

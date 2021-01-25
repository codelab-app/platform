import { ConfigDITokens } from '../../../framework/nestjs/ConfigDITokens'
import { DatabaseConfig } from '../config/DbConfig'
import { PrismaDITokens } from './PrismaDITokens'
import { PrismaService } from './PrismaService'

export const prismaProviders = [
  {
    provide: PrismaDITokens.PrismaService,
    useFactory: (databaseConfig: DatabaseConfig) => {
      return new PrismaService({
        datasources: {
          db: {
            url: databaseConfig.PRISMA_DATABASE_URL,
          },
        },
      })
    },
    inject: [ConfigDITokens.ConfigService],
  },
]

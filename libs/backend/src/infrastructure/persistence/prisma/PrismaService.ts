import { OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import * as shell from 'shelljs'
import { testDatabaseConfig } from '../config/DbConfig'

export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }

  /**
   * Clears the database, used in testing.
   *
   * No way to replace url `schema.prisma`, so we override env here
   */
  resetDb() {
    const resetDbCmd =
      'npx prisma migrate reset --preview-feature -f --skip-generate'

    process.env.PRISMA_DATABASE_URL = testDatabaseConfig.PRISMA_DATABASE_URL

    return shell.exec(resetDbCmd, { cwd: process.cwd() })
  }
}

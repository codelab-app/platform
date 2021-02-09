import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaDelete } from '@paljs/plugins'
import { PrismaClient } from '@prisma/client'
import * as shell from 'shelljs'
import { CodelabLogger } from '../../logger/logger.decorator'
import { testDatabaseConfig } from '../config/DbConfig'

export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  constructor(
    optionsArg: any,
    @CodelabLogger('PrismaService') private logger: Logger,
  ) {
    super(optionsArg)
  }

  declare _cascadeDelete: PrismaDelete

  async onModuleInit() {
    this.logger.log('Prisma connect')
    await this.$connect()

    this._cascadeDelete = new PrismaDelete(this)

    await this.$use(async (params, next) => {
      const before = Date.now()
      const result = await next(params)
      const after = Date.now()

      this.logger.log(
        `Query ${params.model}.${params.action} took ${after - before}ms`,
      )

      return result
    })
  }

  get cascadeDelete() {
    return this._cascadeDelete
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

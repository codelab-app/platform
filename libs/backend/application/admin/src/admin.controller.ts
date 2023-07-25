import { Neo4jService } from '@codelab/backend/infra/adapter/neo4j'
import { Stage } from '@codelab/shared/abstract/core'
import { Body, Controller, Post } from '@nestjs/common'
import { Transform } from 'class-transformer'
import { IsEnum } from 'class-validator'

export class ResetDataDto {
  close?: false

  @IsEnum(Stage)
  @Transform(({ value }) => value ?? Stage.Dev)
  declare stage: Stage
}

@Controller('admin')
export class AdminController {
  constructor(private readonly neo4jService: Neo4jService) {}

  @Post('reset')
  async reset(@Body() resetDataDto: ResetDataDto) {
    const driver = this.neo4jService.driver
    const session = driver.session()

    await session
      /**
       * https://aura.support.neo4j.com/hc/en-us/articles/4412131924883-How-to-wipe-out-delete-all-the-content-in-a-Neo4j-AuraDB-Instance-
       */
      .writeTransaction((txn) => txn.run('MATCH (n) DETACH DELETE n'))
      .catch((error) => {
        console.error(error)
        throw error
      })
      .finally(async () => {
        await session.close()

        /**
         * Need to keep connection open for jest, otherwise subsequent specs won't work
         */
        if (close) {
          await driver.close()
        }
      })
  }
}

import { Inject, Module } from '@nestjs/common'
import { ConfigModule, ConfigType } from '@nestjs/config'
import Joi from 'joi'
import { Neo4jModule } from 'nest-neo4j'
import { join } from 'path'
import { neo4jConfig, neo4jValidation } from '../neo4j.config'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      load: [neo4jConfig],
      validationSchema: Joi.object({
        neo4j: neo4jValidation,
      }),
    }),
    // Neo4jModule.forRoot({
    //   host: 'localhost',
    //   password: 'neo',
    //   port: 7687,
    //   scheme: 'neo4j',
    //   username: 'neo4j',
    // }),
  ],
  providers: [AppService],
})
export class AppModule {
  constructor(
    @Inject(neo4jConfig.KEY)
    private neo4j: ConfigType<typeof neo4jConfig>,
  ) {
    console.log(neo4j)
  }
}

import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@codelab/api/config'
import { Neo4jModule } from '@codelab/api/drivers/neo4j'

@Module({
  imports: [ConfigModule, Neo4jModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

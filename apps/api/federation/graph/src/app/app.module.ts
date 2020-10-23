import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@codelab/api/providers/config'
import { LoggerModule } from '@codelab/api/providers/logger'
import { Neo4jNodeModule } from '@codelab/api/services/node'
import { GrpcPropsClientModule } from '@codelab/api/services/props'

@Module({
  imports: [GrpcPropsClientModule, LoggerModule, ConfigModule, Neo4jNodeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

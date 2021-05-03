import { InfrastructureModule } from '@codelab/backend'
import { LambdaApiModule } from '@codelab/modules/lambda-api'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [InfrastructureModule, LambdaApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class CodelabAppModule {}

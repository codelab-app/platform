import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { InfrastructureModule } from '@codelab/backend'
import { UserModule } from '@codelab/modules/users'

@Module({
  imports: [InfrastructureModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

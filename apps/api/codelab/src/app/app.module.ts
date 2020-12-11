import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { InfrastructureModule } from '@codelab/ddd/backend'
import { UserModule } from '@codelab/ddd/modules/users'

@Module({
  imports: [InfrastructureModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

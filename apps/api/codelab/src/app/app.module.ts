import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from '@codelab/ddd/modules/users'
import { InfrastructureModule } from '@codelab/ddd/shared/infrastructure'

@Module({
  imports: [InfrastructureModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

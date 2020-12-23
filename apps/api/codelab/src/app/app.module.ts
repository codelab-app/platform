import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { InfrastructureModule } from '@codelab/backend'
import { GraphModule } from '@codelab/modules/graph'
import { UserModule } from '@codelab/modules/users'

@Module({
  imports: [InfrastructureModule, UserModule, GraphModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

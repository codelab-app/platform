import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { InfrastructureModule } from '@codelab/backend'
import { EdgeModule } from '@codelab/modules/edge'
import { UserModule } from '@codelab/modules/users'
import { VertexModule } from '@codelab/modules/vertex'

@Module({
  imports: [InfrastructureModule, UserModule, VertexModule, EdgeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

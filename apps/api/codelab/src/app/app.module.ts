import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { InfrastructureModule } from '@codelab/backend'
import { AuthModule } from '@codelab/modules/auth'
import { GraphModule } from '@codelab/modules/graph'
import { UsersModule } from '@codelab/modules/users'

@Module({
  imports: [InfrastructureModule, UsersModule, GraphModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

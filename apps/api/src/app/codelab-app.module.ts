import { InfrastructureModule } from '@codelab/backend/infra'
import { AdminModule } from '@codelab/backend/modules/admin'
import { AppModule } from '@codelab/backend/modules/app'
import { AtomModule } from '@codelab/backend/modules/atom'
import { ElementModule } from '@codelab/backend/modules/element'
import { HookModule } from '@codelab/backend/modules/hook'
import { LambdaModule } from '@codelab/backend/modules/lambda'
import { PageModule } from '@codelab/backend/modules/page'
import { TagModule } from '@codelab/backend/modules/tag'
import { TypeModule } from '@codelab/backend/modules/type'
import { UserModule } from '@codelab/backend/modules/user'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'

@Module({
  imports: [
    InfrastructureModule,
    /**
     * Domain
     */
    AppModule,
    UserModule,
    AdminModule,
    PageModule,
    ElementModule,
    AtomModule,
    TypeModule,
    LambdaModule,
    TagModule,
    HookModule,
  ],
  controllers: [AppController],
})
export class CodelabAppModule {}

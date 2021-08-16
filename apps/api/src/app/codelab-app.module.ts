import { InfrastructureModule } from '@codelab/backend/infra'
import { AppModule } from '@codelab/backend/modules/app'
import { AtomModule } from '@codelab/backend/modules/atom'
import { ElementModule } from '@codelab/backend/modules/element'
import { LambdaModule } from '@codelab/backend/modules/lambda'
import { PageModule } from '@codelab/backend/modules/page'
import { TagModule } from '@codelab/backend/modules/tag'
import { FieldModule } from '@codelab/backend/modules/type'
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
    PageModule,
    ElementModule,
    AtomModule,
    FieldModule,
    LambdaModule,
    TagModule,
  ],
  controllers: [AppController],
})
export class CodelabAppModule {}

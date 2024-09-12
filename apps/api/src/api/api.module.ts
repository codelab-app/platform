import { ActionApplicationModule } from '@codelab/backend/application/action'
import { AdminApplicationModule } from '@codelab/backend/application/admin'
import { AppApplicationModule } from '@codelab/backend/application/app'
import { AtomApplicationModule } from '@codelab/backend/application/atom'
import { ComponentApplicationModule } from '@codelab/backend/application/component'
import { DomainApplicationModule } from '@codelab/backend/application/domain'
import { ElementApplicationModule } from '@codelab/backend/application/element'
import { FieldApplicationModule } from '@codelab/backend/application/field'
import { RedirectApplicationModule } from '@codelab/backend/application/redirect'
import { ResourceApplicationModule } from '@codelab/backend/application/resource'
import { TagApplicationModule } from '@codelab/backend/application/tag'
import { UserApplicationModule } from '@codelab/backend/application/user'
import { RequestContextModule } from '@codelab/backend/infra/adapter/request-context'
import { Module } from '@nestjs/common'
import { DevtoolsModule } from '@nestjs/devtools-integration'

@Module({
  controllers: [],
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
      port: 8000,
    }),
    RequestContextModule,
    ActionApplicationModule,
    AdminApplicationModule,
    AtomApplicationModule,
    UserApplicationModule,
    DomainApplicationModule,
    ElementApplicationModule,
    FieldApplicationModule,
    RedirectApplicationModule,
    ResourceApplicationModule,
    TagApplicationModule,
    AppApplicationModule,
    ComponentApplicationModule,
    // ConfigModule.forRoot({
    //   ignoreEnvVars: true,
    //   isGlobal: true,
    //   load: [endpointConfig],
    // }),
  ],
  providers: [],
})
export class ApiModule {}

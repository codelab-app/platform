import { ActionApplicationModule } from '@codelab/backend/application/action'
import { AdminApplicationModule } from '@codelab/backend/application/admin'
import { AppApplicationModule } from '@codelab/backend/application/app'
import { AtomApplicationModule } from '@codelab/backend/application/atom'
import { JwtAuthGuard } from '@codelab/backend/application/auth'
import { ElementApplicationModule } from '@codelab/backend/application/element'
import { RedirectApplicationModule } from '@codelab/backend/application/redirect'
import { ResourceApplicationModule } from '@codelab/backend/application/resource'
import { TagApplicationModule } from '@codelab/backend/application/tag'
import { UserApplicationModule } from '@codelab/backend/application/user'
import { RequestContextModule } from '@codelab/backend/infra/adapter/request-context'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { endpointConfig } from '../graphql/endpoint.config'

@Module({
  controllers: [],
  imports: [
    // DevtoolsModule.register({
    //   http: process.env.NODE_ENV !== 'production',
    //   port: 8000,
    // }),
    RequestContextModule,
    ActionApplicationModule,
    AdminApplicationModule,
    AtomApplicationModule,
    UserApplicationModule,
    ElementApplicationModule,
    RedirectApplicationModule,
    ResourceApplicationModule,
    TagApplicationModule,
    AppApplicationModule,
    ConfigModule.forRoot({
      ignoreEnvVars: true,
      isGlobal: true,
      load: [endpointConfig],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class ApiModule {}

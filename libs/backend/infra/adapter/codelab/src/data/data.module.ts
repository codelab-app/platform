import { AdminApplicationModule } from '@codelab/backend/application/admin'
import { AppApplicationModule } from '@codelab/backend/application/app'
import { AtomApplicationModule } from '@codelab/backend/application/atom'
import { JwtAuthGuard } from '@codelab/backend/application/shared'
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
    AdminApplicationModule,
    AtomApplicationModule,
    UserApplicationModule,
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
export class DataModule {}

import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './infra/auth'
import { auth0Config, Auth0Module } from './infra/auth0'
import { GetUserService } from './use-cases/get-user'
import { UpsertUserService } from './use-cases/upsert-user'

@Global()
@Module({
  imports: [
    Auth0Module,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.register({}),
    ConfigModule.forFeature(auth0Config),
  ],
  providers: [JwtStrategy, GetUserService, UpsertUserService],
  exports: [],
})
export class AuthModule {}

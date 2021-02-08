import { Module } from '@nestjs/common'
import { DeleteUserService } from '../../core/application/useCases/deleteUser/DeleteUserService'
import { LoginUserService } from '../../core/application/useCases/loginUser/LoginUserService'
import { RegisterUserService } from '../../core/application/useCases/registerUser/RegisterUserService'
import { UpdateUserService } from '../../core/application/useCases/updateUser/UpdateUserService'
import { UserResolvers } from '../../presentation/controllers/UserResolvers'
import { AuthModule } from './AuthModule'
import { GqlAuthGuard } from '@codelab/backend'

@Module({
  imports: [AuthModule],
  providers: [
    GqlAuthGuard,
    /**
     * Controllers
     */
    UserResolvers,
    /**
     * UseCaseProviders
     */
    LoginUserService,
    RegisterUserService,
    UpdateUserService,
    DeleteUserService,
  ],
  exports: [GqlAuthGuard],
})
export class UserModule {}

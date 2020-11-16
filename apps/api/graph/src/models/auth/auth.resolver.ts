import { Query, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'

@Resolver(() => AuthDto)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query((returns) => AuthDto)
  async createAccessToken() {
    const dto = new AuthDto()

    dto.accessToken = await this.authService.createAuthToken()

    return dto
  }
}

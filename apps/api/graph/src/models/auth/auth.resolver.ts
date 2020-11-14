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

  @Query((returns) => String)
  async killServer() {
    await this.authService.killServer()

    return "Doesn't matter, nothing will be returned after server is killed"
  }
}

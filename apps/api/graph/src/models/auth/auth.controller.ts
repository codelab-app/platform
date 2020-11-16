import {
  Controller,
  Get,
  OnModuleInit,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import { UserDto } from '../user/dto/UserDto'
import { UserService } from '../user/user.service'
import { IGoogleUser } from './IGoogleUser'

@Controller('auth')
export class AuthController implements OnModuleInit {
  declare userService: UserService

  constructor(private moduleRef: ModuleRef) {}

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleLogin() {
    // GoogleStrategy to redirect to Google login page
  }

  @UseGuards(AuthGuard('google'))
  @Get('google/redirect')
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const u: IGoogleUser = req.user as IGoogleUser
    // Generate JWT token based on the OAuth2 logged in user
    const userDto: UserDto = await this.userService.loginGoogle(u)
    // Pass the token to client app

    res.json(userDto)
  }

  onModuleInit() {
    this.userService = this.moduleRef.get(UserService, { strict: false })
  }
}

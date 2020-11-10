import { Body, Controller, Get, Logger, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { ICreateUserDto } from './ICreateUserDto'
import { CreateUser } from './user.decorator'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('getUser')
  async test() {
    return 'getUser'
  }

  @Post('createUser')
  async createUser(
    @Body() body: any,
    @CreateUser() user: ICreateUserDto,
    @Res() res: Response,
  ) {
    Logger.log(user, 'UserController user decorator')
    Logger.log(body, 'UserController body decorator')
    await this.userService.createUser(user)

    return res.json({
      accessToken: 'test',
    })
  }
}

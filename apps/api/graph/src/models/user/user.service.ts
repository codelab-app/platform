import { HttpStatus, Injectable, OnModuleInit } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import {
  ApolloCodelabError,
  AppErrorEnum,
} from '../../app/filters/ApolloCodelabError'
import { AuthService } from '../auth/auth.service'
import { UserInput } from './UserInput'
import { UserDto } from './dto/UserDto'
import { UserEntity } from './user.entity'

@Injectable()
export class UserService implements OnModuleInit {
  declare authService: AuthService

  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    private moduleRef: ModuleRef,
  ) {}

  async findAll(): Promise<Array<UserEntity>> {
    return this.userEntityRepository.find()
  }

  async login(user: UserInput): Promise<UserDto> {
    const u = new UserEntity()

    u.username = user.username
    u.password = user.password

    const foundUser = await this.userEntityRepository.findOne({
      where: { username: u.username },
    })

    if (foundUser && foundUser.password === u.password) {
      const res = new UserDto()

      res.user = foundUser
      res.accessToken = await this.authService.getToken(foundUser)

      return res
    }

    throw new ApolloCodelabError(
      `Wrong username or password for user: ${user.username}`,
      AppErrorEnum.WRONG_CREDENTIALS,
      HttpStatus.UNAUTHORIZED.toString(),
    )
  }

  async createUser(user: UserInput): Promise<UserDto> {
    const u = new UserEntity()

    u.username = user.username
    u.password = user.password

    const existingUser = await this.userEntityRepository.findOne({
      where: { username: user.username },
    })

    if (existingUser) {
      throw new ApolloCodelabError(
        `User with username ${existingUser.username} exists`,
        AppErrorEnum.USER_EXIST,
        HttpStatus.CONFLICT.toString(),
      )
    } else {
      const newUser = await this.userEntityRepository.save(u)
      const res = new UserDto()

      res.user = newUser
      res.accessToken = await this.authService.getToken(newUser)

      return res
    }
  }

  onModuleInit() {
    this.authService = this.moduleRef.get(AuthService, { strict: false })
  }
}

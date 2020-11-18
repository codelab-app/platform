import { HttpStatus, Injectable, OnModuleInit } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import {
  ApolloCodelabError,
  AppErrorEnum,
} from '../../app/filters/ApolloCodelabError'
import { IGoogleUser } from '../auth/IGoogleUser'
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

  async refreshToken(token: string) {
    return this.authService.refreshToken(token)
  }

  async loginGoogle(user: IGoogleUser): Promise<UserDto> {
    let accessToken = ''
    const result = new UserDto()
    const foundUser = await this.userEntityRepository.findOne({
      select: ['id', 'email'],
      where: { googleProviderId: user.userId },
    })

    // If google user exists in our DB create JWT token
    if (foundUser) {
      result.user = foundUser
      result.accessToken = await this.authService.getToken(foundUser)
      // Create a user in our DB and create JWT token
    } else {
      const u = new UserEntity()

      u.email = user.username as string
      u.googleProviderId = user.userId

      // Set listeners to false to avoid @BeforeInsert and @BeforeUpdate
      const newUser = await this.userEntityRepository.save(u, {
        listeners: false,
      })

      accessToken = await this.authService.getToken(newUser)
      result.user = newUser
      result.accessToken = accessToken
    }

    return result
  }

  async login(user: UserInput): Promise<UserDto> {
    const foundUser = await this.userEntityRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { email: user.email },
    })
    const passwordMatch = await foundUser?.comparePassword(user.password)

    if (foundUser && passwordMatch) {
      const res = new UserDto()

      res.user = foundUser
      res.accessToken = await this.authService.getToken(foundUser)

      return res
    }

    throw new ApolloCodelabError(
      `Wrong username or password for user: ${user.email}`,
      AppErrorEnum.WRONG_CREDENTIALS,
      HttpStatus.UNAUTHORIZED.toString(),
    )
  }

  async createUserAndGetToken(user: UserInput): Promise<UserDto> {
    const res = new UserDto()

    const newUser = await this.createNewUser(user)

    res.user = newUser
    res.accessToken = await this.authService.getToken(newUser)

    return res
  }

  async createNewUser(user: UserInput): Promise<UserEntity> {
    const u = new UserEntity()

    u.email = user.email
    u.password = user.password

    const newUser = await this.userEntityRepository.save(
      this.userEntityRepository.create(u),
    )

    return newUser
  }

  onModuleInit() {
    this.authService = this.moduleRef.get(AuthService, { strict: false })
  }
}

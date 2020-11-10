import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AppError } from '../../app/filters/AppError'
import { ICreateUserDto } from './ICreateUserDto'
import { UserEntity } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<Array<UserEntity>> {
    return this.userEntityRepository.find()
  }

  async createUser(user: ICreateUserDto): Promise<UserEntity> {
    const u = new UserEntity()

    u.username = user.username
    u.password = user.password

    const existingUser = await this.userEntityRepository.findOne({
      where: { username: user.username },
    })

    if (existingUser) {
      throw new AppError(
        `User with username ${existingUser.username} exists`,
        HttpStatus.I_AM_A_TEAPOT.toString(),
      )
    } else {
      return this.userEntityRepository.save(u)
    }
  }
}

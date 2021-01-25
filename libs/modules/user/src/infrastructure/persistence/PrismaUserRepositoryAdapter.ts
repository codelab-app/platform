import { Prisma } from '@prisma/client'
import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { UserRepositoryPort } from '../../core/adapters/UserRepositoryPort'
import { User } from '../../core/domain/user'
import { PrismaService } from '@codelab/backend'

export class PrismaUserRepositoryAdapter implements UserRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

  async exists(where: Prisma.UserWhereUniqueInput): Promise<boolean> {
    return !!(await this.prismaService.user.findUnique({
      where,
    }))
  }

  async create(data: Prisma.UserCreateInput): Promise<Option<User>> {
    try {
      const user = await this.prismaService.user.create({
        data,
      })

      return O.some(User.hydrate(user))
    } catch (e) {
      return O.none
    }
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<Option<User>> {
    const deleted = await this.prismaService.user.delete({
      where,
    })

    return deleted ? O.some(User.hydrate(deleted)) : O.none
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<Option<User>> {
    const user = await this.prismaService.user.update({
      data,
      where,
    })

    return user ? O.some(User.hydrate(user)) : O.none
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<Option<User>> {
    const found = await this.prismaService.user.findUnique({
      where,
    })

    return found ? O.some(User.hydrate(found)) : O.none
  }
}

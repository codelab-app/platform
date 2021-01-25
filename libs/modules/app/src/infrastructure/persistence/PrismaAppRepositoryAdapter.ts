import { Prisma } from '@prisma/client'
import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { AppRepositoryPort } from '../../core/adapters/AppRepositoryPort'
import { App } from '../../core/domain/app'
import { PrismaService } from '@codelab/backend'

export class PrismaAppRepositoryAdapter implements AppRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: Prisma.AppCreateInput,
    userId: string,
  ): Promise<Option<App>> {
    try {
      const app = await this.prismaService.app.create({
        data: {
          ...data,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      })

      return O.some(App.hydrate(app))
    } catch (e) {
      return O.none
    }
  }

  async delete(where: Prisma.AppWhereUniqueInput): Promise<Option<App>> {
    let result: Option<App>
    let app

    try {
      app = await this.prismaService.app.delete({ where })
      result = O.some(App.hydrate(app))
    } catch (e) {
      result = O.none
    }

    return result
  }

  async findOne(where: Prisma.AppWhereUniqueInput): Promise<Option<App>> {
    const app = await this.prismaService.app.findUnique({
      where,
    })

    return app ? O.some(App.hydrate(app)) : O.none
  }

  async findMany(
    where: Prisma.AppWhereInput,
    userId?: string,
  ): Promise<Array<App>> {
    const appWhere = userId ? { ...where, user: { id: userId } } : where

    const apps = await this.prismaService.app.findMany({
      where: appWhere,
    })

    return apps.map((app) => App.hydrate(app))
  }

  async update(
    where: Prisma.AppWhereUniqueInput,
    data: Prisma.AppUpdateInput,
  ): Promise<Option<App>> {
    const app = await this.prismaService.app.update({
      data,
      where,
    })

    return app ? O.some(App.hydrate(app)) : O.none
  }
}

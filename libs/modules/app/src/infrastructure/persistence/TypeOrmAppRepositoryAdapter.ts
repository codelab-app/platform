import { plainToClass } from 'class-transformer'
import { option as O } from 'fp-ts'
import { Option, isNone } from 'fp-ts/Option'
import { EntityRepository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'
import { Page } from '../../../../page/src/core/domain/page'
import { AppRepositoryPort } from '../../core/adapters/AppRepositoryPort'
import { AppDto } from '../../core/application/useCases/AppDto'
import { App } from '../../core/domain/app'
import { NOID, TypeOrmApp, UUID } from '@codelab/backend'
import { ByAppCondition, ByAppConditions, isAppId } from '@codelab/modules/app'
import { User } from '@codelab/modules/user'

@EntityRepository(TypeOrmApp)
export class TypeOrmAppRepositoryAdapter
  extends BaseRepository<TypeOrmApp>
  implements AppRepositoryPort {
  async createApp(app: App<NOID>, user: User): Promise<App> {
    const newApp = await this.save({
      ...app.toPersistence(),
      user: user.toPersistence(),
    })

    return plainToClass(App, newApp)
  }

  async deleteApp(appId: string): Promise<Option<App>> {
    const app = await this.findSingle({ appId })

    if (isNone(app)) {
      return O.none
    }

    await this.remove(app.value.toPersistence())

    return app
  }

  async findSingle(app: ByAppCondition, userId?: UUID): Promise<Option<App>> {
    let foundApp: TypeOrmApp | undefined
    let where: object = {}

    if (userId) {
      where = {
        ...where,
        user: {
          id: userId.value,
        },
      }
    }

    if (isAppId(app)) {
      where = {
        ...where,
        id: app.appId,
      }
    }

    foundApp = await this.findOne({
      relations: ['user'],
      where,
    })

    return foundApp ? O.some(plainToClass(App, foundApp)) : O.none
  }

  async updateApp(
    appCondition: ByAppCondition,
    data: AppDto,
  ): Promise<Option<App>> {
    const foundApp = await this.findSingle(appCondition)

    if (isNone(foundApp)) {
      return O.none
    }

    const { affected } = await this.update(
      foundApp.value.id.toString(),
      data,
    )

    if (affected) {
      return this.findSingle(appCondition)
    }

    return O.none
  }

  async findMany(apps: ByAppConditions, userId: UUID): Promise<Array<App>> {
    const foundApps = await this.find({
      relations: ['user'],
      where: {
        user: {
          id: userId.value,
        },
      },
    })

    return foundApps.map((app) => plainToClass(App, app))
  }

  async addPageToApp(app: App, page: Page): Promise<void> {
    const typeOrmPage = page.toPersistence()

    const foundApp = await this.findOneOrFail(app.id.value)

    if (foundApp.pages && foundApp.pages.length > 0) {
      foundApp.pages.push(typeOrmPage)
    } else {
      foundApp.pages = [typeOrmPage]
    }

    await this.save(foundApp)
  }
}

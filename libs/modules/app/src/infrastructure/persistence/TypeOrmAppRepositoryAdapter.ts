import { plainToClass } from 'class-transformer'
import { option as O } from 'fp-ts'
import { Option, isNone } from 'fp-ts/Option'
import { AbstractRepository, EntityRepository } from 'typeorm'
import { Page } from '../../../../page/src/core/domain/page'
import {
  ByAppCondition,
  ByAppConditions,
  isAppId,
} from '../../common/QueryConditions'
import { AppRepositoryPort } from '../../core/adapters/AppRepositoryPort'
import { App } from '../../core/domain/app'
import { NOID, TypeOrmApp, UUID } from '@codelab/backend'
import { User } from '@codelab/modules/user'

@EntityRepository(TypeOrmApp)
export class TypeOrmAppRepositoryAdapter
  extends AbstractRepository<TypeOrmApp>
  implements AppRepositoryPort {
  async create(app: App<NOID>, user: User): Promise<App> {
    const newApp = await this.repository.save({
      ...app.toPersistence(),
      user: user.toPersistence(),
    })

    return plainToClass(App, newApp)
  }

  async delete(appId: string): Promise<Option<App>> {
    const app = await this.findOne({ appId })

    if (isNone(app)) {
      return Promise.resolve(O.none)
    }

    await this.repository.remove(app.value.toPersistence())

    return Promise.resolve(app)
  }

  async findOne(app: ByAppCondition, userId?: UUID): Promise<Option<App>> {
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

    const foundApp = await this.repository.findOne({
      relations: ['user'],
      where,
    })

    return foundApp ? O.some(plainToClass(App, foundApp)) : O.none
  }

  async findMany(apps: ByAppConditions, userId: UUID): Promise<Array<App>> {
    const foundApps = await this.repository.find({
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
    const typeOrmApp = app.toPersistence()
    const typeOrmPage = page.toPersistence()

    const foundApp = await this.repository.findOneOrFail(typeOrmApp.id)

    if (foundApp.pages && foundApp.pages.length > 0) {
      foundApp.pages.push(typeOrmPage)
    } else {
      foundApp.pages = [typeOrmPage]
    }

    await this.repository.save(foundApp)
  }
}

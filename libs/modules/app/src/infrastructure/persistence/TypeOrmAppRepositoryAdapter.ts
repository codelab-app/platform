import { plainToClass } from 'class-transformer'
import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { EntityRepository, Repository } from 'typeorm'
import { Page } from '../../../../page/src/core/domain/page'
import { AppsWhere, FindAppBy } from '../../common/CommonTypes'
import { isId } from '../../common/utils'
import { AppRepositoryPort } from '../../core/adapters/AppRepositoryPort'
import { App } from '../../core/domain/app'
import { NOID, TypeOrmApp, UUID } from '@codelab/backend'
import { User } from '@codelab/modules/user'

@EntityRepository(TypeOrmApp)
export class TypeOrmAppRepositoryAdapter
  extends Repository<TypeOrmApp>
  implements AppRepositoryPort {
  async createApp(app: App<NOID>, user: User): Promise<App> {
    const newApp = await this.save({
      ...app.toPersistence(),
      user: user.toPersistence(),
    })

    return plainToClass(App, newApp)
  }

  async deleteApp(appId: string): Promise<Option<App>> {
    const typeOrmApp = await this.findOne(appId)

    if (!typeOrmApp) {
      return O.none
    }

    const apps = await this.remove([typeOrmApp])

    return O.some(plainToClass(App, apps[0]))
  }

  async findApp(by: FindAppBy): Promise<Option<App>> {
    let typeOrmApp

    if (isId(by)) {
      typeOrmApp = await this.findOne(by.id)
    }

    return typeOrmApp ? O.some(plainToClass(App, typeOrmApp)) : O.none
  }

  async findApps(by: AppsWhere, userId: UUID): Promise<Array<App>> {
    const apps = await this.find({
      relations: ['user'],
      where: {
        user: {
          id: userId.value,
        },
      },
    })

    return apps.map((app) => plainToClass(App, app))
  }

  async addPageToApp(app: App, page: Page): Promise<void> {
    const typeOrmApp = app.toPersistence()
    const typeOrmPage = page.toPersistence()

    const foundApp = await this.findOneOrFail(typeOrmApp.id)

    if (foundApp.pages && foundApp.pages.length > 0) {
      foundApp.pages.push(typeOrmPage)
    } else {
      foundApp.pages = [typeOrmPage]
    }

    await this.save(foundApp)
  }
}

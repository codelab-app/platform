import { plainToClass } from 'class-transformer'
import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { AbstractRepository, EntityRepository } from 'typeorm'
import { Page } from '../../../../page/src/core/domain/page'
import { ByAppCondition, ByAppConditions } from '../../common/CommonTypes'
import { isId } from '../../common/utils'
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

  async deleteApp(appId: string): Promise<Option<App>> {
    const typeOrmApp = await this.repository.findOne(appId)

    if (!typeOrmApp) {
      return O.none
    }

    const apps = await this.repository.remove([typeOrmApp])

    return O.some(plainToClass(App, apps[0]))
  }

  async findOne(by: ByAppCondition): Promise<Option<App>> {
    let typeOrmApp

    if (isId(by)) {
      typeOrmApp = await this.repository.findOne(by.id)
    }

    return typeOrmApp ? O.some(plainToClass(App, typeOrmApp)) : O.none
  }

  async find(by: ByAppConditions, userId: UUID): Promise<Array<App>> {
    const apps = await this.repository.find({
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

    const foundApp = await this.repository.findOneOrFail(typeOrmApp.id)

    if (foundApp.pages && foundApp.pages.length > 0) {
      foundApp.pages.push(typeOrmPage)
    } else {
      foundApp.pages = [typeOrmPage]
    }

    await this.repository.save(foundApp)
  }
}

import { plainToClass } from 'class-transformer'
import { EntityRepository, Repository } from 'typeorm'
import { AppsWhere } from '../../common/CommonTypes'
import { AppRepositoryPort } from '../../core/adapters/AppRepositoryPort'
import { App } from '../../core/domain/app'
import { TypeOrmApp, UUID } from '@codelab/backend'
import { User } from '@codelab/modules/user'

@EntityRepository(TypeOrmApp)
export class TypeOrmAppRepositoryAdapter
  extends Repository<TypeOrmApp>
  implements AppRepositoryPort {
  // private userRepository: Repository<TypeOrmUser> = getRepository(TypeOrmUser)

  async createApp(app: App, user: User): Promise<App> {
    const newApp = await this.save({
      ...app.toPersistence(),
      user: user.toPersistence(),
    })

    return plainToClass(App, newApp)
  }

  async findApps(by: AppsWhere, userId: UUID): Promise<Array<App>> {
    console.log('findApps', userId.value)

    const apps = await this.find({
      relations: ['user'],
      // where: {
      //   'user.id': userId.value,
      // },
    })

    console.log(apps)

    return apps.map((app) => App.hydrate(app))
  }
}

import { plainToClass } from 'class-transformer'
import { EntityRepository, Repository } from 'typeorm'
import { TypeOrmApp } from '../../../../../backend/src/infrastructure/persistence/typeorm/entity/TypeOrmApp'
import { AppRepositoryPort } from '../../core/adapters/AppRepositoryPort'
import { App } from '../../core/domain/app'
import { TypeOrmUser } from '@codelab/backend'
import { User } from '@codelab/modules/user'

@EntityRepository(TypeOrmApp)
export class TypeOrmAppRepositoryAdapter
  extends Repository<TypeOrmApp>
  implements AppRepositoryPort {
  async createApp(app: App, user: User): Promise<App> {
    const typeOrmApp: TypeOrmApp = app.toPersistence()
    const typeOrmUser: TypeOrmUser = user.toPersistence()

    typeOrmApp.user = typeOrmUser

    const savedAppTypeOrm: TypeOrmApp = await this.save(typeOrmApp)
    const savedApp = plainToClass(App, savedAppTypeOrm)

    return savedApp
  }
}

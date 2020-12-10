import { Module, OnApplicationBootstrap, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked'
import {
  DatabaseModule,
  GraphqlModule,
} from '@codelab/ddd/backend/infrastructure'

const providers: Array<Provider> = []

@Module({
  imports: [CqrsModule, DatabaseModule, GraphqlModule],
  providers,
})
export class InfrastructureModule implements OnApplicationBootstrap {
  onApplicationBootstrap() {
    initializeTransactionalContext()
  }
}

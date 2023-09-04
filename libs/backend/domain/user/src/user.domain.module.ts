import { OgmModule } from '@codelab/backend/infra/adapter/neo4j'
import { Module } from '@nestjs/common'
import { UserRepository } from './repository'

@Module({
  exports: [UserRepository],
  imports: [OgmModule],
  providers: [UserRepository],
})
export class UserDomainModule {}

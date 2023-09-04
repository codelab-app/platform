import { OGMModule } from '@codelab/backend/infra/adapter/neo4j'
import { Module } from '@nestjs/common'
import { UserRepository } from './repository'

@Module({
  exports: [UserRepository],
  imports: [OGMModule],
  providers: [UserRepository],
})
export class UserDomainModule {}

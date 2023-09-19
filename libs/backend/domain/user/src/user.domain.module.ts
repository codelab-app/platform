import { OgmModule } from '@codelab/backend/infra/adapter/neo4j'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { Module } from '@nestjs/common'
import { UserRepository } from './repository'

@Module({
  exports: [UserRepository],
  imports: [OgmModule, ValidationModule],
  providers: [UserRepository],
})
export class UserDomainModule {}

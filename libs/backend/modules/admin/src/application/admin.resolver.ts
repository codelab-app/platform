import { Void } from '@codelab/backend/abstract/types'
import { Mutation, Resolver } from '@nestjs/graphql'
import { ResetDataService } from '../use-cases/reset-data'

@Resolver()
export class AdminResolver {
  constructor(private resetDataService: ResetDataService) {}

  @Mutation(() => Void, { nullable: true })
  resetData() {
    return this.resetDataService.execute()
  }
}

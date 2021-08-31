import { Void } from '@codelab/backend/infra'
import { Mutation, Resolver } from '@nestjs/graphql'
import { ResetDataService } from '../use-cases/reset-data'

@Resolver()
export class AdminResolver {
  constructor(private resetDataService: ResetDataService) {}

  @Mutation(() => Void, { nullable: true })
  resetData() {
    this.resetDataService.execute()
  }
}

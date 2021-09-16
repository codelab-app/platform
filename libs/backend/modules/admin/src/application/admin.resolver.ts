import { Void } from '@codelab/backend/abstract/types'
import { Mutation, Resolver } from '@nestjs/graphql'
import { ResetDataService } from '../use-cases/reset-data'

@Resolver()
export class AdminResolver {
  constructor(private resetDataService: ResetDataService) {}

  @Mutation(() => Void, { nullable: true })
  async resetData() {
    await this.resetDataService.execute()
  }
}

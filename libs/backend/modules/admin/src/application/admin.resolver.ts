import { Void } from '@codelab/backend/abstract/types'
import { PayloadResponse } from '@codelab/backend/application'
import { GqlAuthGuard } from '@codelab/backend/infra'
import { Roles } from '@codelab/backend/modules/user'
import { Role } from '@codelab/shared/abstract/core'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import {
  ExecuteCommandInput,
  ExecuteCommandService,
} from '../use-cases/execute-command'
import { ResetDataService } from '../use-cases/reset-data'

@Resolver()
export class AdminResolver {
  constructor(
    private resetDataService: ResetDataService,
    private executeCommandService: ExecuteCommandService,
  ) {}

  @Mutation(() => Void, { nullable: true })
  async resetData() {
    return await this.resetDataService.execute()
  }

  @Mutation(() => PayloadResponse)
  @Roles(Role.Admin)
  @UseGuards(GqlAuthGuard)
  async executeCommand(@Args('input') input: ExecuteCommandInput) {
    return this.executeCommandService.execute(input)
  }
}

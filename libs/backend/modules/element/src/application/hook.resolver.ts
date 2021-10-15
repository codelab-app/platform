import { Void } from '@codelab/backend/abstract/types'
import { CreateResponse } from '@codelab/backend/application'
import { GqlAuthGuard } from '@codelab/backend/infra'
import { Hook } from '@codelab/backend/modules/hook'
import { CurrentUser } from '@codelab/backend/modules/user'
import type { User } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import {
  AddHookToElementInput,
  AddHookToElementService,
} from '../use-cases/element/hooks/add-hook-to-element'
import {
  RemoveHookFromElementInput,
  RemoveHookFromElementService,
} from '../use-cases/element/hooks/remove-hook-from-element'

@Resolver(() => Hook)
@Injectable()
export class HookResolver {
  constructor(
    private addHookToElementService: AddHookToElementService,
    private removeHookFromElementService: RemoveHookFromElementService,
  ) {}

  @Mutation(() => CreateResponse)
  @UseGuards(GqlAuthGuard)
  addHookToElement(
    @Args('input') input: AddHookToElementInput,
    @CurrentUser() currentUser: User,
  ) {
    return this.addHookToElementService.execute({ input, currentUser })
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  removeHookFromElement(
    @Args('input') input: RemoveHookFromElementInput,
    @CurrentUser() currentUser: User,
  ) {
    return this.removeHookFromElementService.execute({ input, currentUser })
  }
}

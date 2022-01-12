import { Transaction, Transactional } from '@codelab/backend/application'
import { GqlAuthGuard, ITransaction } from '@codelab/backend/infra'
import {
  Hook,
  IHookRepository,
  IHookRepositoryToken,
} from '@codelab/backend/modules/hook'
import { CurrentUser } from '@codelab/backend/modules/user'
import type { IUser } from '@codelab/shared/abstract/core'
import { Inject, Injectable, UseGuards } from '@nestjs/common'
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
    @Inject(IHookRepositoryToken)
    private hookRepository: IHookRepository,
    private addHookToElementService: AddHookToElementService,
    private removeHookFromElementService: RemoveHookFromElementService,
  ) {}

  @Mutation(() => Hook)
  @UseGuards(GqlAuthGuard)
  @Transactional()
  async addHookToElement(
    @Args('input') input: AddHookToElementInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    const { id } = await this.addHookToElementService.execute({
      input,
      currentUser,
      transaction,
    })

    const hook = await this.hookRepository.getOne(id, transaction)

    if (!hook) {
      throw new Error("Couldn't find element")
    }

    return hook
  }

  @Mutation(() => Hook, { nullable: true })
  @UseGuards(GqlAuthGuard)
  @Transactional()
  async removeHookFromElement(
    @Args('input') input: RemoveHookFromElementInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    const hook = await this.hookRepository.getOne(input.hookId, transaction)

    if (!hook) {
      throw new Error("Couldn't find element")
    }

    await this.removeHookFromElementService.execute({
      input,
      transaction,
      currentUser,
    })

    return hook
  }
}

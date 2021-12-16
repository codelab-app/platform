import { Transaction, Transactional } from '@codelab/backend/application'
import { GqlAuthGuard, ITransaction } from '@codelab/backend/infra'
import { CurrentUser } from '@codelab/backend/modules/user'
import { IUser } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Element } from '../domain/element/element.model'
import { CreateComponentService } from '../use-cases/component/create-component'
import { CreateComponentInput } from '../use-cases/component/create-component/create-component.input'
import {
  GetComponentsInput,
  GetComponentsService,
} from '../use-cases/component/get-components'
import { GetElementService } from '../use-cases/element/get-element/get-element.service'

@Resolver(() => Element)
@Injectable()
export class ComponentResolver {
  constructor(
    private createComponentService: CreateComponentService,
    private getComponentsService: GetComponentsService,
    private getElementService: GetElementService,
  ) {}

  @Mutation(() => Element, {
    description: 'Facade for creating a element with component tag',
  })
  @UseGuards(GqlAuthGuard)
  @Transactional()
  async createComponent(
    @Args('input') input: CreateComponentInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    const { id } = await this.createComponentService.execute({
      input,
      currentUser,
      transaction,
    })

    return this.getElementService.execute({
      input: { where: { id } },
      currentUser,
      transaction,
    })
  }

  @Query(() => [Element], { defaultValue: [] })
  @UseGuards(GqlAuthGuard)
  @Transactional()
  async getComponents(
    @Args('input', { nullable: true, type: () => GetComponentsInput })
    input: GetComponentsInput | undefined,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    return this.getComponentsService.execute({
      input,
      currentUser,
      transaction,
    })
  }
}

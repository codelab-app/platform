import { GqlAuthGuard } from '@codelab/backend/infra'
import { CurrentUser } from '@codelab/backend/modules/user'
import { IElement, IUser } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  CreateComponentInput,
  CreateComponentService,
} from '../../use-cases/component/create-component'
import {
  GetComponentsInput,
  GetComponentsService,
} from '../../use-cases/component/get-components'
import { GetElementGraphService } from '../../use-cases/element/get-element-graph'
import { Element } from '../element/element.model'

@Resolver(() => Element)
@Injectable()
export class ComponentResolver {
  constructor(
    private createComponentService: CreateComponentService,
    private getComponentsService: GetComponentsService,
    private getElementGraphService: GetElementGraphService,
  ) {}

  @Mutation(() => Element)
  @UseGuards(GqlAuthGuard)
  async createComponent(
    @Args('input') input: CreateComponentInput,
    @CurrentUser() currentUser: IUser,
  ) {
    const { id } = await this.createComponentService.execute({
      input,
      currentUser,
    })

    const elementGraph = await this.getElementGraphService.execute({
      input: { where: { id } },
      currentUser,
    })

    const element = elementGraph.vertices.filter(
      (vertex: IElement) => vertex.id === id,
    )[0]

    if (!element) {
      return null
    }

    return new Element(element)
  }

  @Query(() => [Element], { defaultValue: [] })
  @UseGuards(GqlAuthGuard)
  async getComponents(
    @CurrentUser() currentUser: IUser,
    @Args('input', { nullable: true }) input?: GetComponentsInput,
  ) {
    return this.getComponentsService.execute({
      input,
      currentUser,
    })
  }
}

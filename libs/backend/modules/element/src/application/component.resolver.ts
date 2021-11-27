import { GqlAuthGuard } from '@codelab/backend/infra'
import { CurrentUser } from '@codelab/backend/modules/user'
import { IElement, IUser } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Element } from '../domain/element/element.model'
import { CreateComponentInput } from '../use-cases/component/create-component/create-component.input'
import {
  GetComponentsInput,
  GetComponentsService,
} from '../use-cases/component/get-components'
import { CreateElementService } from '../use-cases/element/create-element'
import { GetElementGraphService } from '../use-cases/element/get-element-graph'

@Resolver(() => Element)
@Injectable()
export class ComponentResolver {
  constructor(
    private createElementService: CreateElementService,
    private getComponentsService: GetComponentsService,
    private getElementGraphService: GetElementGraphService,
  ) {}

  @Mutation(() => Element, {
    description: 'Facade for creating a element with component tag',
  })
  @UseGuards(GqlAuthGuard)
  async createComponent(
    @Args('input') input: CreateComponentInput,
    @CurrentUser() currentUser: IUser,
  ) {
    const { id } = await this.createElementService.execute({
      input: {
        isComponent: true,
        name: input.name,
      },
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

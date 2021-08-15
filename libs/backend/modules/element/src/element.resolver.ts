import {
  CreateResponse,
  CurrentUser,
  GqlAuthGuard,
  JwtPayload,
  Void,
} from '@codelab/backend/infra'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ElementAdapter } from './element.adapter'
import { ElementTreeAdapter } from './element-tree.adapter'
import { Element, ElementGraph } from './models'
import {
  CreateElementInput,
  CreateElementService,
  DeleteElementInput,
  DeleteElementService,
  GetElementGraphInput,
  GetElementGraphService,
  MoveElementInput,
  MoveElementService,
  UpdateElementInput,
  UpdateElementPropsInput,
  UpdateElementPropsService,
  UpdateElementService,
} from './use-cases'
import { GetElementInput } from './use-cases/get-element'

@Resolver(() => Element)
@Injectable()
export class ElementResolver {
  constructor(
    private createElementService: CreateElementService,
    private getElementGraphService: GetElementGraphService,
    private deleteElementService: DeleteElementService,
    private updateElementService: UpdateElementService,
    private moveElementService: MoveElementService,
    private elementTreeAdapter: ElementTreeAdapter,
    private updateElementPropsService: UpdateElementPropsService,
    private elementAdapter: ElementAdapter,
  ) {}

  @Mutation(() => CreateResponse)
  @UseGuards(GqlAuthGuard)
  createElement(
    @Args('input') input: CreateElementInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.createElementService.execute({ input, currentUser })
  }

  @Query(() => ElementGraph, {
    nullable: true,
    description:
      'Aggregates the requested element and all of its descendant elements (infinitely deep) in the form of a flat array of Element and array of ElementEdge',
  })
  @UseGuards(GqlAuthGuard)
  async getElementGraph(
    @Args('input') input: GetElementGraphInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    const dgraphElement = await this.getElementGraphService.execute({
      input,
      currentUser,
    })

    if (!dgraphElement) {
      return null
    }

    return this.elementTreeAdapter.mapSingle(dgraphElement)
  }

  @Query(() => Element, {
    nullable: true,
    description: 'Get a single element.',
  })
  @UseGuards(GqlAuthGuard)
  /**
   * Same as GetElementGraph, except we map the data differently
   */
  async getElement(
    @Args('input') input: GetElementInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    const dgraphElement = await this.getElementGraphService.execute({
      input,
      currentUser,
    })

    if (!dgraphElement) {
      return null
    }

    return this.elementAdapter.map(dgraphElement)
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async updateElement(
    @Args('input') input: UpdateElementInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    await this.updateElementService.execute({ input, currentUser })
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async moveElement(
    @Args('input') input: MoveElementInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    await this.moveElementService.execute({ input, currentUser })
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async updateElementProps(
    @Args('input') input: UpdateElementPropsInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    await this.updateElementPropsService.execute({ input, currentUser })
  }

  @Mutation(() => Void, {
    nullable: true,
    description: 'Deletes an element and all the descending elements',
  })
  @UseGuards(GqlAuthGuard)
  async deleteElement(
    @Args('input') input: DeleteElementInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    await this.deleteElementService.execute({ input, currentUser })
  }
}

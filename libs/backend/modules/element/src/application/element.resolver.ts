import {
  CreateResponse,
  CurrentUser,
  GqlAuthGuard,
  Void,
} from '@codelab/backend/infra'
import { Atom, AtomAdapter } from '@codelab/backend/modules/atom'
import { User } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Element } from '../domain/element/element.model'
import { ElementGraph } from '../domain/element/element-graph.model'
import {
  CreateElementInput,
  CreateElementService,
} from '../use-cases/element/create-element'
import {
  DeleteElementInput,
  DeleteElementService,
} from '../use-cases/element/delete-element'
import { GetElementInput } from '../use-cases/element/get-element'
import {
  GetElementGraphInput,
  GetElementGraphService,
} from '../use-cases/element/get-element-graph'
import {
  MoveElementInput,
  MoveElementService,
} from '../use-cases/element/move-element'
import {
  UpdateElementInput,
  UpdateElementService,
} from '../use-cases/element/update-element'
import {
  UpdateElementPropsInput,
  UpdateElementPropsService,
} from '../use-cases/element/update-element-props'
import { ElementAdapter } from './element.adapter'
import { ElementTreeAdapter } from './element-tree.adapter'

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
    private atomAdapter: AtomAdapter,
  ) {}

  @Mutation(() => CreateResponse)
  @UseGuards(GqlAuthGuard)
  createElement(
    @Args('input') input: CreateElementInput,
    @CurrentUser() currentUser: User,
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
    @CurrentUser() currentUser: User,
  ) {
    const dgraphElement = await this.getElementGraphService.execute({
      input,
      currentUser,
    })

    if (!dgraphElement) {
      return null
    }

    return await this.elementTreeAdapter.mapItem(dgraphElement)
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
    @CurrentUser() currentUser: User,
  ) {
    const dgraphElement = await this.getElementGraphService.execute({
      input,
      currentUser,
    })

    if (!dgraphElement) {
      return null
    }

    return this.elementAdapter.mapItem(dgraphElement)
  }

  @ResolveField('atom', () => Atom, { nullable: true })
  async atom(@Parent() { atom }: Element) {
    if (!atom) {
      return null
    }

    return this.atomAdapter.mapItem(atom)
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async updateElement(
    @Args('input') input: UpdateElementInput,
    @CurrentUser() currentUser: User,
  ) {
    await this.updateElementService.execute({ input, currentUser })
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async moveElement(
    @Args('input') input: MoveElementInput,
    @CurrentUser() currentUser: User,
  ) {
    await this.moveElementService.execute({ input, currentUser })
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async updateElementProps(
    @Args('input') input: UpdateElementPropsInput,
    @CurrentUser() currentUser: User,
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
    @CurrentUser() currentUser: User,
  ) {
    await this.deleteElementService.execute({ input, currentUser })
  }
}

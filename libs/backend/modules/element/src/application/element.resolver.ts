import { GqlAuthGuard } from '@codelab/backend/infra'
import { CurrentUser } from '@codelab/backend/modules/user'
import { IElement, IUser } from '@codelab/shared/abstract/core'
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
  ConvertElementToComponentInput,
  ConvertElementToComponentService,
} from '../use-cases/element/convert-element-to-component'
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

@Resolver(() => Element)
@Injectable()
export class ElementResolver {
  constructor(
    private createElementService: CreateElementService,
    private getElementGraphService: GetElementGraphService,
    private deleteElementService: DeleteElementService,
    private updateElementService: UpdateElementService,
    private moveElementService: MoveElementService,
    private updateElementPropsService: UpdateElementPropsService,
    private convertElementToComponentService: ConvertElementToComponentService,
  ) {}

  @Mutation(() => Element)
  @UseGuards(GqlAuthGuard)
  async createElement(
    @Args('input') input: CreateElementInput,
    @CurrentUser() currentUser: IUser,
  ) {
    const { id } = await this.createElementService.execute({
      input,
      currentUser,
    })

    const element = await this.getElement({ where: { id } }, currentUser)

    if (!element) {
      throw new Error("Couldn't find created element")
    }

    return element
  }

  @Query(() => ElementGraph, {
    description:
      'Aggregates the requested element and all of its descendant elements (infinitely deep) in the form of a flat array of Element and array of ElementEdge',
  })
  @UseGuards(GqlAuthGuard)
  async getElementGraph(
    @Args('input') input: GetElementGraphInput,
    @CurrentUser() currentUser: IUser,
  ) {
    return this.getElementGraphService.execute({
      input,
      currentUser,
    })
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
    @CurrentUser() currentUser: IUser,
  ) {
    const elementGraph = await this.getElementGraphService.execute({
      input,
      currentUser,
    })

    const element = elementGraph.vertices.filter(
      (vertex: IElement) => vertex.id === input.where.id,
    )[0]

    if (!element) {
      return null
    }

    return new Element(element)
  }

  @Mutation(() => Element)
  @UseGuards(GqlAuthGuard)
  async updateElement(
    @Args('input') input: UpdateElementInput,
    @CurrentUser() currentUser: IUser,
  ) {
    await this.updateElementService.execute({ input, currentUser })

    const element = await this.getElement(
      { where: { id: input.id } },
      currentUser,
    )

    if (!element) {
      throw new Error("Couldn't find element")
    }

    return element
  }

  @Mutation(() => Element)
  @UseGuards(GqlAuthGuard)
  async moveElement(
    @Args('input') input: MoveElementInput,
    @CurrentUser() currentUser: IUser,
  ) {
    await this.moveElementService.execute({ input, currentUser })

    const element = await this.getElement(
      { where: { id: input.elementId } },
      currentUser,
    )

    if (!element) {
      throw new Error("Couldn't find element")
    }

    return element
  }

  @Mutation(() => Element)
  @UseGuards(GqlAuthGuard)
  async updateElementProps(
    @Args('input') input: UpdateElementPropsInput,
    @CurrentUser() currentUser: IUser,
  ) {
    await this.updateElementPropsService.execute({ input, currentUser })

    const element = await this.getElement(
      { where: { id: input.elementId } },
      currentUser,
    )

    if (!element) {
      throw new Error("Couldn't find element")
    }

    return element
  }

  @Mutation(() => Element, {
    description: 'Deletes an element and all the descending elements',
  })
  @UseGuards(GqlAuthGuard)
  async deleteElement(
    @Args('input') input: DeleteElementInput,
    @CurrentUser() currentUser: IUser,
  ) {
    const element = await this.getElement(
      { where: { id: input.elementId } },
      currentUser,
    )

    await this.deleteElementService.execute({ input, currentUser })

    if (!element) {
      throw new Error("Couldn't find element")
    }

    return element
  }

  @Mutation(() => Element)
  @UseGuards(GqlAuthGuard)
  async convertElementToComponent(
    @Args('input') input: ConvertElementToComponentInput,
    @CurrentUser() currentUser: IUser,
  ) {
    await this.convertElementToComponentService.execute({
      input,
      currentUser,
    })

    const element = await this.getElement(
      { where: { id: input.elementId } },
      currentUser,
    )

    if (!element) {
      throw new Error("Couldn't find element")
    }

    return element
  }

  @ResolveField('graph', () => ElementGraph, {
    description:
      'Aggregates the requested element and all of its descendant elements (infinitely deep) in the form of a flat array of Element and array of ElementEdge',
  })
  @UseGuards(GqlAuthGuard)
  async elementGraphResolver(
    @Parent() input: Element,
    @CurrentUser() currentUser: IUser,
  ) {
    return this.getElementGraphService.execute({
      input: { where: { id: input.id } },
      currentUser,
    })
  }
}

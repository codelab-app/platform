import { Transaction, Transactional } from '@codelab/backend/application'
import { GqlAuthGuard, ITransaction } from '@codelab/backend/infra'
import { CurrentUser } from '@codelab/backend/modules/user'
import { IUser } from '@codelab/shared/abstract/core'
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
import {
  DuplicateElementInput,
  DuplicateElementService,
} from '../use-cases/element/duplicate-element'
import { GetElementInput } from '../use-cases/element/get-element'
import { GetElementService } from '../use-cases/element/get-element/get-element.service'
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
    private getElementService: GetElementService,
    private deleteElementService: DeleteElementService,
    private updateElementService: UpdateElementService,
    private moveElementService: MoveElementService,
    private duplicateElementService: DuplicateElementService,
    private updateElementPropsService: UpdateElementPropsService,
    private convertElementToComponentService: ConvertElementToComponentService,
  ) {}

  @Mutation(() => Element)
  @UseGuards(GqlAuthGuard)
  @Transactional()
  async createElement(
    @Args('input') input: CreateElementInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    const { id } = await this.createElementService.execute({
      input,
      currentUser,
      transaction,
    })

    const element = await this.getElement(
      { where: { id } },
      currentUser,
      transaction,
    )

    if (!element) {
      throw new Error("Couldn't find created element")
    }

    return element
  }

  @Query(() => ElementGraph, {
    description:
      'Aggregates the requested element and all of its descendant elements (infinitely deep) in the form of a flat array of Element and array of ElementEdge',
  })
  @Transactional()
  @UseGuards(GqlAuthGuard)
  async getElementGraph(
    @Args('input') input: GetElementGraphInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    return this.getElementGraphService.execute({
      input,
      transaction,

      currentUser,
    })
  }

  @Query(() => Element, {
    nullable: true,
    description: 'Get a single element.',
  })
  @UseGuards(GqlAuthGuard)
  @Transactional()
  async getElement(
    @Args('input') input: GetElementInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    const element = await this.getElementService.execute({
      input,
      transaction,
      currentUser,
    })

    if (!element) {
      return null
    }

    return new Element(element)
  }

  @Mutation(() => Element)
  @UseGuards(GqlAuthGuard)
  @Transactional()
  async updateElement(
    @Args('input') input: UpdateElementInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    await this.updateElementService.execute({ input, transaction, currentUser })

    const element = await this.getElement(
      { where: { id: input.id } },
      currentUser,
      transaction,
    )

    if (!element) {
      throw new Error("Couldn't find element")
    }

    return element
  }

  @Mutation(() => Element)
  @UseGuards(GqlAuthGuard)
  @Transactional()
  async moveElement(
    @Args('input') input: MoveElementInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    await this.moveElementService.execute({ input, transaction, currentUser })

    const element = await this.getElement(
      { where: { id: input.elementId } },
      currentUser,
      transaction,
    )

    if (!element) {
      throw new Error("Couldn't find element")
    }

    return element
  }

  @Mutation(() => Element)
  @UseGuards(GqlAuthGuard)
  @Transactional()
  async duplicateElement(
    @Args('input') input: DuplicateElementInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    const res = await this.duplicateElementService.execute({
      input,
      transaction,
      currentUser,
    })

    const element = await this.getElement(
      { where: { id: res.id } },
      currentUser,
      transaction,
    )

    if (!element) {
      throw new Error("Couldn't find element")
    }

    return element
  }

  @Mutation(() => Element)
  @UseGuards(GqlAuthGuard)
  @Transactional()
  async updateElementProps(
    @Args('input') input: UpdateElementPropsInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    await this.updateElementPropsService.execute({
      input,
      transaction,
      currentUser,
    })

    const element = await this.getElement(
      { where: { id: input.elementId } },
      currentUser,
      transaction,
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
  @Transactional()
  async deleteElement(
    @Args('input') input: DeleteElementInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    const element = await this.getElement(
      { where: { id: input.elementId } },
      currentUser,
      transaction,
    )

    await this.deleteElementService.execute({ input, transaction, currentUser })

    if (!element) {
      throw new Error("Couldn't find element")
    }

    return element
  }

  @Mutation(() => Element)
  @UseGuards(GqlAuthGuard)
  @Transactional()
  async convertElementToComponent(
    @Args('input') input: ConvertElementToComponentInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    await this.convertElementToComponentService.execute({
      input,
      currentUser,
      transaction,
    })

    const element = await this.getElement(
      { where: { id: input.elementId } },
      currentUser,
      transaction,
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
  @Transactional()
  async elementGraphResolver(
    @Parent() input: Element,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    return this.getElementGraphService.execute({
      input: { where: { id: input.id } },
      currentUser,
      transaction,
    })
  }
}

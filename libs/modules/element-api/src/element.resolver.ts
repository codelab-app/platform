import { DeleteResponse } from '@codelab/backend'
import { JwtPayload } from '@codelab/backend/adapters'
import { CurrentUser, GqlAuthGuard } from '@codelab/modules/auth-api'
import {
  GetPropAggregatesService,
  PropAggregate,
} from '@codelab/modules/prop-api'
import { Injectable, UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Element, ElementAggregate } from './models'
import {
  CreateElementInput,
  CreateElementService,
  DeleteElementInput,
  DeleteElementService,
  GetElementAggregateInput,
  GetElementAggregateService,
  GetElementInput,
  GetElementService,
  MoveElementInput,
  MoveElementService,
  UpdateElementInput,
  UpdateElementService,
} from './use-cases'

@Resolver(() => Element)
@Injectable()
export class ElementResolver {
  constructor(
    private createElementService: CreateElementService,
    private getElementService: GetElementService,
    private getElementAggregateService: GetElementAggregateService,
    private deleteElementService: DeleteElementService,
    private updateElementService: UpdateElementService,
    private moveElementService: MoveElementService,
    private getPropAggregatesService: GetPropAggregatesService,
  ) {}

  @Mutation(() => Element)
  @UseGuards(GqlAuthGuard)
  createElement(
    @Args('input') input: CreateElementInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.createElementService.execute({ input, currentUser })
  }

  @Query(() => Element, { nullable: true })
  @UseGuards(GqlAuthGuard)
  getElement(
    @Args('input') input: GetElementInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.getElementService.execute({ input, currentUser })
  }

  @Query(() => ElementAggregate, {
    nullable: true,
    description:
      'Aggregates the requested element and all of its descendant elements (infinitely deep) in the form of array of Element and array of ElementLink',
  })
  @UseGuards(GqlAuthGuard)
  getElementAggregate(
    @Args('input') input: GetElementAggregateInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.getElementAggregateService.execute({ input, currentUser })
  }

  @Mutation(() => Element)
  @UseGuards(GqlAuthGuard)
  updateElement(
    @Args('input') input: UpdateElementInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.updateElementService.execute({ input, currentUser })
  }

  @Mutation(() => Element)
  @UseGuards(GqlAuthGuard)
  moveElement(
    @Args('input') input: MoveElementInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.moveElementService.execute({ input, currentUser })
  }

  @Mutation(() => DeleteResponse, {
    description: 'Deletes an element and all the descending elements',
  })
  @UseGuards(GqlAuthGuard)
  deleteElement(
    @Args('input') input: DeleteElementInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.deleteElementService.execute({ input, currentUser })
  }

  @ResolveField('props', () => [PropAggregate])
  resolveProps(@Parent() element: Element) {
    return this.getPropAggregatesService.execute({
      byElement: { elementIds: [element.id] },
    })
  }
}

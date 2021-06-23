import { DeleteResponse } from '@codelab/backend'
import {
  CurrentUser,
  GqlAuthGuard,
  JwtPayload,
} from '@codelab/modules/auth-api'
import { Field, GetFieldService } from '@codelab/modules/type-api'
import { Injectable, UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Prop, PropAggregate } from './models'
import {
  CreatePropInput,
  CreatePropService,
  GetPropAggregatesService,
  GetPropsInput,
} from './use-cases'

@Resolver(() => Prop)
@Injectable()
export class PropResolver {
  constructor(
    private getPropAggregatesService: GetPropAggregatesService,
    private getFieldService: GetFieldService,
    private createPropService: CreatePropService,
  ) {}

  @Query(() => PropAggregate)
  @UseGuards(GqlAuthGuard)
  getProp() {
    return null!
  }

  //by atomId
  @Query(() => [PropAggregate])
  @UseGuards(GqlAuthGuard)
  getProps(@Args('input') input: GetPropsInput) {
    return this.getPropAggregatesService.execute(input)
  }

  @Mutation(() => Prop)
  @UseGuards(GqlAuthGuard)
  createProp(
    @Args('input') input: CreatePropInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.createPropService.execute({ input, currentUser })
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeleteResponse)
  deleteProp() {
    return { affected: 0 }
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('field', () => Field)
  resolveFields(@Parent() prop: Prop) {
    return this.getFieldService.execute({
      input: { byId: { fieldId: prop.field.id } },
    })
  }
}

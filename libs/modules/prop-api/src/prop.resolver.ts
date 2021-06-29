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
  GetPropAggregatesService,
  GetPropsInput,
  UpsertPropsInput,
  UpsertPropsResponse,
  UpsertPropsService,
} from './use-cases'

@Resolver(() => Prop)
@Injectable()
export class PropResolver {
  constructor(
    private getPropAggregatesService: GetPropAggregatesService,
    private getFieldService: GetFieldService,
    private upsertPropService: UpsertPropsService,
  ) {}

  @Query(() => [PropAggregate])
  @UseGuards(GqlAuthGuard)
  getProps(@Args('input') input: GetPropsInput) {
    return this.getPropAggregatesService.execute(input)
  }

  @Mutation(() => UpsertPropsResponse)
  @UseGuards(GqlAuthGuard)
  upsertProp(
    @Args('input', { type: () => [UpsertPropsInput] })
    input: Array<UpsertPropsInput>,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.upsertPropService.execute({ input, currentUser })
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

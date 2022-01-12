import { GqlAuthGuard } from '@codelab/backend/infra'
import { Injectable, UseGuards } from '@nestjs/common'
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Prop } from '../domain'
import { GetPropService } from '../use-cases/get-prop/get-prop.service'

@Resolver(() => Prop)
@Injectable()
export class PropResolver {
  constructor(private readonly getPropService: GetPropService) {}

  @Query(() => Prop)
  @UseGuards(GqlAuthGuard)
  async getProp(@Parent() parent: Prop) {
    return parent
  }

  @ResolveField('data', () => String)
  @UseGuards(GqlAuthGuard)
  async dataResolver(@Parent() input: Prop) {
    return input.data
  }
}

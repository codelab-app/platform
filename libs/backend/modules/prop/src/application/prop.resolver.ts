import { GqlAuthGuard } from '@codelab/backend/infra'
import { Injectable, UseGuards } from '@nestjs/common'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Prop } from '../domain'

@Resolver(() => Prop)
@Injectable()
export class PropResolver {
  @ResolveField('data', () => String)
  @UseGuards(GqlAuthGuard)
  async elementGraphResolver(@Parent() input: Prop) {
    return input.data
  }
}

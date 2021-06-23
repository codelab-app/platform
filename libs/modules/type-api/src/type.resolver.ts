import { GqlAuthGuard } from '@codelab/modules/auth-api'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { Type } from './models'
import { GetTypeInput, GetTypeService } from './use-cases'

@Resolver(() => Type)
@Injectable()
export class TypeResolver {
  constructor(private getTypeService: GetTypeService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Type, { nullable: true })
  getType(@Args('input') input: GetTypeInput) {
    return this.getTypeService.execute({
      input,
    })
  }
}

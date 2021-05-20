import { GqlAuthGuard } from '@codelab/backend'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { AtomType } from './atomType.model'
import { GetAtomTypesInput, GetAtomTypesService } from './use-cases'

@Resolver(() => AtomType)
@Injectable()
export class AtomTypeResolver {
  constructor(private getAtomTypesService: GetAtomTypesService) {}

  @Query(() => [AtomType])
  @UseGuards(GqlAuthGuard)
  get(@Args('input', { nullable: true }) input?: GetAtomTypesInput) {
    return this.getAtomTypesService.execute(input)
  }
}

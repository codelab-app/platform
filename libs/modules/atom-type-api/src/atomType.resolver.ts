import { GqlAuthGuard } from '@codelab/backend'
import { Injectable, UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { AtomType } from './atomType.model'
import { GetAtomTypesService } from './use-cases'

@Resolver(() => AtomType)
@Injectable()
export class AtomTypeResolver {
  constructor(private getAtomTypesService: GetAtomTypesService) {}

  @Query(() => [AtomType])
  @UseGuards(GqlAuthGuard)
  getAtomTypes() {
    return this.getAtomTypesService.execute({})
  }
}

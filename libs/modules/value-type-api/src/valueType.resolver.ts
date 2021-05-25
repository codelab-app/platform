import { GqlAuthGuard } from '@codelab/backend'
import { Injectable, UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { ValueType } from './valueType.model'
import { GetValueTypesService } from './use-cases'

@Resolver(() => ValueType)
@Injectable()
export class ValueTypeResolver {
  constructor(private getValueTypesService: GetValueTypesService) {}

  @Query(() => [ValueType])
  @UseGuards(GqlAuthGuard)
  getValueTypes() {
    return this.getValueTypesService.execute({})
  }
}

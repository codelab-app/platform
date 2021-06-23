import { Injectable } from '@nestjs/common'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ArrayValue, PropValue } from './models'
import { GetArrayValuesService } from './use-cases'

@Resolver(() => ArrayValue)
@Injectable()
export class ArrayValueResolver {
  constructor(private getArrayValuesService: GetArrayValuesService) {}

  @ResolveField('values', () => [PropValue])
  resolveValues(@Parent() parent: ArrayValue) {
    return this.getArrayValuesService.execute({ arrayValueId: parent.id })
  }
}

import { DeleteResponse } from '@codelab/backend'
import { GetFieldService } from '@codelab/modules/type-api'
import { Injectable } from '@nestjs/common'
import {
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Prop, PropAggregate } from './models'
import { GetPropsService } from './use-cases'

@Resolver(() => Prop)
@Injectable()
export class PropResolver {
  constructor(
    private getPropsService: GetPropsService,
    private getFieldService: GetFieldService,
  ) {}

  @Query(() => PropAggregate)
  getProp() {
    return null!
  }

  //by atomId
  @Query(() => [PropAggregate])
  getProps() {
    return []
  }

  @Mutation(() => Prop)
  createProp() {
    return null!
  }

  @Mutation(() => DeleteResponse)
  deleteProp() {
    return { affected: 0 }
  }

  @ResolveField('field')
  resolveFields(@Parent() prop: Prop) {
    return this.getFieldService.execute({
      input: { byId: { fieldId: prop.field.id } },
    })
  }
}

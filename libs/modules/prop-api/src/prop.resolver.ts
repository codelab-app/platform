import { Injectable } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { Prop } from './prop.model'
import { GetPropsService } from './use-cases'

@Resolver(() => Prop)
@Injectable()
export class PropResolver {
  constructor(private getPropsService: GetPropsService) {}

  @Query(() => [Prop])
  getProps() {
    return this.getPropsService.execute({})
  }
}

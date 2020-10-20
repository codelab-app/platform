import { Logger } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { Prop } from '../model/prop.model'
import { PropsService } from '../props.service'

@Resolver(() => Prop)
export class PropsResolver {
  constructor(private readonly propsService: PropsService) {}

  // @ResolveReference()
  // resolveReference(prop: { __typename: string; id: number }) {
  //   Logger.log('resolverReference')

  //   return this.propsService.findOneById(prop.id)
  // }

  @Query(() => Prop, { name: 'props' })
  props(@Args('id') id: number): Prop | undefined {
    Logger.log('props')

    return this.propsService.findOneById(id)
  }
}

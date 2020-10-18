import { Logger } from '@nestjs/common'
import { Args, Int, Query, ResolveReference, Resolver } from '@nestjs/graphql'
import { Prop } from '../model/prop.model'
import { PropsService } from '../props.service'

@Resolver(() => Prop)
export class PropsResolver {
  constructor(private readonly propsService: PropsService) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }) {
    Logger.log('resolverReference')

    return this.propsService.findOneById(reference.id)
  }

  @Query(() => Prop, { name: 'props' })
  props(@Args('id', { type: () => Int }) id: number): Prop | undefined {
    Logger.log('props')

    return this.propsService.findOneById(id)
  }
}

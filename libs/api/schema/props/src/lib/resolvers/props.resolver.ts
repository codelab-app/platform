import { Logger } from '@nestjs/common'
import { Args, Int, Query, ResolveReference, Resolver } from '@nestjs/graphql'
import { Prop } from '../model/prop.model'
import { PropsService } from '../props.service'

@Resolver(() => Prop)
export class PropsResolver {
  constructor(private readonly propsService: PropsService) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }) {
    return this.propsService.findOneById(reference.id)
  }

  @Query(() => Prop, { name: 'props' })
  getProps(@Args('id', { type: () => Int }) id: number): Prop | undefined {
    Logger.warn('Test')

    return this.propsService.findOneById(id)
  }
}

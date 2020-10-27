import { Inject } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { Prop } from '../model'
import {
  CODELAB_LOGGER_PROVIDER,
  CodelabLogger,
} from '@codelab/api/providers/logger'

@Resolver(() => Prop)
export class PropsResolver {
  constructor(
    // private readonly propsService: PropsService,
    @Inject(CODELAB_LOGGER_PROVIDER) private readonly logger: CodelabLogger,
  ) {}

  // @ResolveReference()
  // resolveReference(prop: { __typename: string; id: number }) {
  //   Logger.log('resolverReference')

  //   return this.propsService.findOneById(prop.id)
  // }

  @Query(() => Prop, { name: 'prop' })
  prop(@Args('id') id: number): Prop | undefined {
    this.logger.log('resolve props!')

    // return this.propsService.findOneById(id)
    return { id: 1, values: {} }
  }
}

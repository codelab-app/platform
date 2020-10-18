import { ResolveReference, Resolver } from '@nestjs/graphql'
import { Prop } from './prop.model'
import { PropsService } from './props.service'

@Resolver(() => Prop)
export class PropsResolver {
  constructor(private readonly propsService: PropsService) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }) {
    return this.propsService.findOneById(reference.id)
  }
}

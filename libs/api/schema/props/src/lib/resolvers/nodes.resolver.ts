import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Prop } from '../model/prop.model'
import { PropsService } from '../props.service'
import { Node } from '@codelab/api/schema/node'

@Resolver(() => Node)
export class NodesResolver {
  constructor(private readonly propsService: PropsService) {}

  @ResolveField((of) => [Prop])
  public props(@Parent() node: Node): Prop | undefined {
    return this.propsService.findOneById(node.id)
  }
}

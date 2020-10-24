import { Logger } from '@nestjs/common'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { GraphqlPropsService } from '../graphql-props.service'
import { Node, Prop } from '../model'

@Resolver(() => Node)
export class NodesResolver {
  constructor(private readonly propsService: GraphqlPropsService) {}

  @ResolveField((of) => Prop, { name: 'props' })
  public getProps(@Parent() node: Node): Prop | undefined {
    const props = this.propsService.findOneById(node.id)

    Logger.log(node)
    Logger.log(props)

    return props
  }
}

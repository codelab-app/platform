import { Logger } from '@nestjs/common'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Node } from '../model'
import { Prop } from '../model/prop.model'
import { PropsService } from '../props.service'

@Resolver(() => Node)
export class NodesResolver {
  constructor(private readonly propsService: PropsService) {}

  @ResolveField((of) => Prop, { name: 'props' })
  public getProps(@Parent() node: Node): Prop | undefined {
    const props = this.propsService.findOneById(node.id)

    Logger.log(node)
    Logger.log(props)

    return props
  }
}

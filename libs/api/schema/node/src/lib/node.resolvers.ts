import { Inject } from '@nestjs/common'
import {
  Args,
  Mutation,
  Query,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql'
import { Node, NodeType } from './node.model'
import { CODELAB_LOGGER_PROVIDER, CodelabLogger } from '@codelab/api/logger'

const nodes = [
  {
    id: 1,
    type: 'React.Button',
  },
  { id: 2, type: 'React.Div' },
]

@Resolver(() => Node)
export class NodeResolvers {
  constructor(
    @Inject(CODELAB_LOGGER_PROVIDER) private readonly logger: CodelabLogger,
  ) {}

  @ResolveReference()
  resolveReference(node: { __typename: string; id: number }) {
    this.logger.log('Hello')

    return nodes.find(({ id }) => id === node.id)
  }

  @Query((returns) => Node)
  node() {
    return nodes[0]
  }

  @Mutation((returns) => Node)
  createNode(@Args({ name: 'type', type: () => NodeType }) type: NodeType) {
    console.log('create')

    return {}
  }
}

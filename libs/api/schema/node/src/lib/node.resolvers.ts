import { Query, ResolveReference, Resolver } from '@nestjs/graphql'
import { Node } from './node.model'

const nodes = [
  {
    id: 1,
    type: 'React.Button',
  },
  { id: 2, type: 'React.Div' },
]

@Resolver(() => Node)
export class NodeResolvers {
  @ResolveReference()
  resolveReference(node: { __typename: string; id: number }) {
    return nodes.find(({ id }) => id === node.id)
  }

  @Query((returns) => Node)
  node() {
    return nodes[0]
  }
}

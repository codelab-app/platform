import { join } from 'path'
import { Inject, OnModuleInit } from '@nestjs/common'
import {
  Args,
  Mutation,
  Query,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql'
import { Client, ClientGrpc, Transport } from '@nestjs/microservices'
import { NodeCreateInput } from './node.input'
import { Node } from './node.model'
import {
  CODELAB_LOGGER_PROVIDER,
  CodelabLogger,
} from '@codelab/api/providers/logger'

const nodes = [
  {
    id: 1,
    type: 'React.Button',
  },
  { id: 2, type: 'React.Div' },
]

@Resolver(() => Node)
export class NodeResolvers implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'api.federation.props',
      url: 'localhost:50051',
      protoPath: join(
        process.cwd(),
        'apps/api/federation/props/src/proto/props.proto',
      ),
    },
  })
  private declare readonly client: ClientGrpc

  private declare nodeService: any

  constructor(
    @Inject(CODELAB_LOGGER_PROVIDER) private readonly logger: CodelabLogger,
  ) {}

  onModuleInit() {
    this.nodeService = this.client.getService('PropsService')
  }

  @ResolveReference()
  resolveReference(node: { __typename: string; id: number }) {
    // this.logger.log('Hello')

    return nodes.find(({ id }) => id === node.id)
  }

  @Query(() => Node)
  node() {
    return nodes[0]
  }

  @Mutation(() => Node)
  nodeCreate(@Args('input') input: NodeCreateInput) {
    return this.nodeService.createProps(input)
  }
}

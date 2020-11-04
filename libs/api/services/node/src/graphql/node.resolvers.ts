import * as path from 'path'
import { Inject, OnModuleInit } from '@nestjs/common'
import {
  Args,
  Context,
  Directive,
  Info,
  Mutation,
  Query,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql'
import { ClientGrpc, Transport } from '@nestjs/microservices'
import { ClientOptions } from '@nestjs/microservices/interfaces/client-metadata.interface'
import { GraphQLJSONObject } from 'graphql-type-json'
import { neo4jgraphql } from 'neo4j-graphql-js'
import { Neo4jNodeService } from '../neo4j'
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

const clientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'api.federation.props',
    url: 'localhost:50051',
    protoPath: path.join(
      process.cwd(),
      'apps/api/federation/props/src/proto/props.proto',
    ),
  },
}

@Resolver(() => Node)
export class NodeResolvers implements OnModuleInit {
  // @Client(clientOptions)
  // private declare readonly client: ClientGrpc

  private declare nodeService: any

  constructor(
    @Inject(CODELAB_LOGGER_PROVIDER) private readonly logger: CodelabLogger,
    @Inject('NODE_PACKAGE') private client: ClientGrpc,
    private readonly neo4jNodeService: Neo4jNodeService,
  ) {}

  onModuleInit() {
    this.nodeService = this.client.getService('PropsService')
  }

  @ResolveReference()
  resolveReference(node: { __typename: string; id: number }) {
    // this.logger.log('Hello')

    return nodes.find(({ id }) => id === node.id)
  }

  @Directive(
    '@deprecated(reason: "This query will be removed in the next version")',
  )
  @Query(() => Node)
  node() {
    return nodes[0]
  }

  @Mutation(() => Node)
  @Directive(
    `@cypher(statement:"UNWIND $data as node CREATE (n:Node {id: node.id, type: node.type}) RETURN n")`,
  )
  async nodeCreate(
    @Args('data') data: NodeCreateInput,
    @Context() context: any,
    @Info() resolveInfo: any,
  ) {
    const object = null
    // return this.nodeService.createProps(input)

    return neo4jgraphql(object, { data }, context, resolveInfo)
  }

  @Query(() => GraphQLJSONObject!)
  async clearGraph() {
    return this.neo4jNodeService.run(`MATCH (n) DETACH DELETE n`)
  }
}

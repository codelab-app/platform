import { Field, InputType } from '@nestjs/graphql'
import { VertexType as PrismaVertexType } from '@prisma/client'
import { VertexType } from '../../../domain/vertex/VertexType'

@InputType()
export class UpdateNodeInput {
  @Field()
  declare graphId: string

  @Field()
  declare vertexId: string

  @Field(() => VertexType)
  declare type?: PrismaVertexType
}

import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import { NodeType } from '@codelab/alpha/shared/interface/node'

@ObjectType()
export class VertexUseCaseDto {
  @Field()
  public declare id: string

  @Field((returns) => NodeType)
  public declare type: NodeType

  @Field((returns) => GraphQLJSONObject)
  public declare props: any
}

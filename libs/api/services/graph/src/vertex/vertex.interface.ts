import { Field, Int, InterfaceType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'

@InterfaceType()
export abstract class IVertex {
  @Field((type) => Int)
  id?: number

  @Field((returns) => GraphQLJSONObject, { nullable: true })
  declare props?: any
}

export enum VertexType {
  REACT_BUTTON = 'REACT_BUTTON',
  REACT_TEXT = 'REACT_TEXT',
}

export interface DeleteVertexDTO {
  id: string
}

export interface CreateVertexDTO {
  type: VertexType
}

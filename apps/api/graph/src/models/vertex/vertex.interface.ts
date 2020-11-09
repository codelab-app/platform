import { Field, InterfaceType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'

@InterfaceType()
export abstract class IVertex {
  @Field((type) => String)
  declare id: string

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

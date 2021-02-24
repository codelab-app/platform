import {
  FieldPolicy,
  FieldReadFunction,
  TypePolicies,
  TypePolicy,
} from '@apollo/client/cache'
import gql from 'graphql-tag'

export type QueryKeySpecifier = Array<'getBuilder' | QueryKeySpecifier>
export type QueryFieldPolicy = {
  getBuilder?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MutationKeySpecifier = Array<'setBuilder' | MutationKeySpecifier>
export type MutationFieldPolicy = {
  setBuilder?: FieldPolicy<any> | FieldReadFunction<any>
}
export type BuilderKeySpecifier = Array<
  | 'position'
  | 'windowPosition'
  | 'component'
  | 'isDragging'
  | BuilderKeySpecifier
>
export type BuilderFieldPolicy = {
  position?: FieldPolicy<any> | FieldReadFunction<any>
  windowPosition?: FieldPolicy<any> | FieldReadFunction<any>
  component?: FieldPolicy<any> | FieldReadFunction<any>
  isDragging?: FieldPolicy<any> | FieldReadFunction<any>
}
export type PositionKeySpecifier = Array<'x' | 'y' | PositionKeySpecifier>
export type PositionFieldPolicy = {
  x?: FieldPolicy<any> | FieldReadFunction<any>
  y?: FieldPolicy<any> | FieldReadFunction<any>
}
export type TypedTypePolicies = TypePolicies & {
  Query?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | QueryKeySpecifier
      | (() => undefined | QueryKeySpecifier)
    fields?: QueryFieldPolicy
  }
  Mutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MutationKeySpecifier
      | (() => undefined | MutationKeySpecifier)
    fields?: MutationFieldPolicy
  }
  Builder?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BuilderKeySpecifier
      | (() => undefined | BuilderKeySpecifier)
    fields?: BuilderFieldPolicy
  }
  Position?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PositionKeySpecifier
      | (() => undefined | PositionKeySpecifier)
    fields?: PositionFieldPolicy
  }
}

export const typeDefs = gql`
  type Query {
    getBuilder: Builder!
  }

  type Mutation {
    setBuilder(input: SetBuilderInput!): Builder!
  }

  input PositionInput {
    x: Int!
    y: Int!
  }

  input SetBuilderInput {
    position: PositionInput
    windowPosition: PositionInput
    component: String
  }

  type Builder {
    position: Position!
    windowPosition: Position!
    component: String
    isDragging: Boolean!
  }

  type Position {
    x: Int!
    y: Int!
  }
`

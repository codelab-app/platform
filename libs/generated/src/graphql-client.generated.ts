import {
  FieldPolicy,
  FieldReadFunction,
  TypePolicies,
  TypePolicy,
} from '@apollo/client/cache'
import gql from 'graphql-tag'

export type QueryKeySpecifier = Array<
  'getLayout' | 'getBuilder' | QueryKeySpecifier
>
export type QueryFieldPolicy = {
  getLayout?: FieldPolicy<any> | FieldReadFunction<any>
  getBuilder?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MutationKeySpecifier = Array<
  'setLayout' | 'setBuilder' | MutationKeySpecifier
>
export type MutationFieldPolicy = {
  setLayout?: FieldPolicy<any> | FieldReadFunction<any>
  setBuilder?: FieldPolicy<any> | FieldReadFunction<any>
}
export type LayoutKeySpecifier = Array<
  'tab' | 'pane' | 'paneVisibility' | LayoutKeySpecifier
>
export type LayoutFieldPolicy = {
  tab?: FieldPolicy<any> | FieldReadFunction<any>
  pane?: FieldPolicy<any> | FieldReadFunction<any>
  paneVisibility?: FieldPolicy<any> | FieldReadFunction<any>
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
  Layout?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | LayoutKeySpecifier
      | (() => undefined | LayoutKeySpecifier)
    fields?: LayoutFieldPolicy
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
    getLayout: Layout!
    getBuilder: Builder!
  }

  type Mutation {
    setLayout(input: SetLayoutInput!): Layout!
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

  input SetLayoutInput {
    tab: LayoutTab
    pane: LayoutPane
    paneVisibility: LayoutPaneVisibility
  }

  type Layout {
    tab: LayoutTab!
    pane: LayoutPane!
    paneVisibility: LayoutPaneVisibility!
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

  enum LayoutTab {
    Component
    Page
    Tree
  }

  enum LayoutPane {
    Main
    Detail
    Both
    None
  }

  enum LayoutPaneVisibility {
    Main
    Detail
    Both
    None
  }
`

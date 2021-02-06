import {
  FieldPolicy,
  FieldReadFunction,
  TypePolicies,
  TypePolicy,
} from '@apollo/client/cache'
import gql from 'graphql-tag'

export type QueryKeySpecifier = Array<'getLayout' | QueryKeySpecifier>
export type QueryFieldPolicy = {
  getLayout?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MutationKeySpecifier = Array<'setLayout' | MutationKeySpecifier>
export type MutationFieldPolicy = {
  setLayout?: FieldPolicy<any> | FieldReadFunction<any>
}
export type LayoutKeySpecifier = Array<
  'tab' | 'pane' | 'paneVisibility' | LayoutKeySpecifier
>
export type LayoutFieldPolicy = {
  tab?: FieldPolicy<any> | FieldReadFunction<any>
  pane?: FieldPolicy<any> | FieldReadFunction<any>
  paneVisibility?: FieldPolicy<any> | FieldReadFunction<any>
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
}

export const typeDefs = gql`
  type Query {
    getLayout: Layout!
  }

  input SetLayoutInput {
    tab: LayoutTab
    pane: LayoutPane
    paneVisibility: LayoutPaneVisibility
  }

  type Mutation {
    setLayout(input: SetLayoutInput!): Layout!
  }

  type Layout {
    tab: LayoutTab
    pane: LayoutPane
    paneVisibility: LayoutPaneVisibility
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

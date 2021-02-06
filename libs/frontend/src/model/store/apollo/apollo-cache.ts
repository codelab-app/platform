import { InMemoryCache, Resolvers, makeVar } from '@apollo/client'
import {
  Builder,
  Layout,
  LayoutPane,
  LayoutPaneVisibility,
  LayoutTab,
  TypedTypePolicies,
} from '@codelab/generated'

const layoutVar = makeVar<Layout>({
  __typename: 'Layout',
  tab: LayoutTab.Component,
  pane: LayoutPane.None,
  paneVisibility: LayoutPaneVisibility.Both,
})

const builderVar = makeVar<Builder>({
  __typename: 'Builder',
  position: { __typename: 'Position', x: 0, y: 0 },
  windowPosition: { __typename: 'Position', x: 0, y: 0 },
  component: null,
  isDragging: false,
})

const typePolicies: TypedTypePolicies = {
  Query: {
    fields: {
      getLayout: {
        read() {
          return layoutVar()
        },
      },
      getBuilder: {
        read() {
          return builderVar()
        },
      },
    },
  },
}

export const resolvers: Resolvers = {
  Mutation: {
    setLayout(_root, args, context, info) {
      return layoutVar({ ...layoutVar(), ...args.input })
    },
    setBuilder(_root, args, context, info) {
      return builderVar({ ...builderVar(), ...args.input })
    },
  },
}

export const cache = new InMemoryCache({ typePolicies })

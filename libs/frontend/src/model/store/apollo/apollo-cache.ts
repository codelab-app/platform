import { InMemoryCache, Resolvers, makeVar } from '@apollo/client'
import {
  Layout,
  LayoutPane,
  LayoutPaneVisibility,
  LayoutTab,
  TypedTypePolicies,
} from '@codelab/generated'

const layoutVar = makeVar<Layout>({
  tab: LayoutTab.Component,
  pane: LayoutPane.None,
  paneVisibility: LayoutPaneVisibility.Both,
})

const typePolicies: TypedTypePolicies = {
  Query: {
    keyFields: ['getLayout'],
    fields: {
      getLayout: {
        read() {
          return layoutVar()
        },
      },
    },
  },
  // Layout: {
  //   keyFields: [],
  //   fields: {
  //     name: {
  //       read() {
  //         return layoutVar()
  //       },
  //     },
  //   },
  // },
}

export const resolvers: Resolvers = {
  Mutation: {
    setLayout(_root, args, context, info) {
      return layoutVar({ ...layoutVar(), ...args.input })
    },
  },
}

export const cache = new InMemoryCache({ typePolicies })

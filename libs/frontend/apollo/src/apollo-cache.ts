import { InMemoryCache, Resolvers, makeVar } from '@apollo/client'

const builderVar = makeVar({
  __typename: 'Builder',
  position: { __typename: 'Position', x: 0, y: 0 },
  windowPosition: { __typename: 'Position', x: 0, y: 0 },
  component: null,
  isDragging: false,
})

const typePolicies = {
  Query: {
    fields: {
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
    setBuilder(_root, args, context, info) {
      return builderVar({ ...builderVar(), ...args.input })
    },
  },
}

export const cache = new InMemoryCache({ typePolicies })

import { InMemoryCacheConfig } from '@apollo/client'

export const apolloCacheConfig: InMemoryCacheConfig = {
  typePolicies: {
    // __typename
    Query: {
      fields: {
        // fieldName
        builder: {
          read() {
            return ['a', 'b', 'c']
          },
        },
      },
    },
  },
}

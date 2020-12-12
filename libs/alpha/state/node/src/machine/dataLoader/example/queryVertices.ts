import { ApolloClient, gql } from '@apollo/client'
import { createQueryObservable } from '../createQueryObservable'

export const QueryDocument = gql`
  query vertices {
    vertices {
      id
    }
  }
`

type Vertices = {
  id: string
}
type Response = {
  vertices: Array<Vertices>
}

const mapper = (q: Response) => q.vertices.map(({ id }) => ({ id }))

export const queryVertices = (apolloClient: ApolloClient<any>) => () => {
  return createQueryObservable(apolloClient)({ query: QueryDocument }, mapper)
}

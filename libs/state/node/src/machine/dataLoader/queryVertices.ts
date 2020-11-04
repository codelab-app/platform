import { gql } from '@apollo/client';
import { ApolloClient } from '@apollo/client';
import { handleQueryResult } from './handleResult';

const QueryDocument = gql`
    query vertices {
        vertices {
            id
        }
    }
`;

export const queryVertices = (apolloClient: ApolloClient<any>) => () => {
    const query = apolloClient.watchQuery<any>({
        query: QueryDocument,
    });

    return handleQueryResult(query, (q: any) => {
        return q.vertices;
    });
}

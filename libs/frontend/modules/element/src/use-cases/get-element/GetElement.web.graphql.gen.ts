import * as Types from '@codelab/shared/codegen/graphql';

import { ElementFragment } from '../../graphql/Element.fragment.graphql.gen';
import { ElementFragmentDoc } from '../../graphql/Element.fragment.graphql.gen';
import { api } from '@codelab/frontend/model/infra/api';
export type GetElementQueryVariables = Types.Exact<{
  input: Types.GetElementInput;
}>;


export type GetElementQuery = { getElement?: ElementFragment | null | undefined };


export const GetElementGql = `
    query GetElement($input: GetElementInput!) {
  getElement(input: $input) {
    ...Element
  }
}
    ${ElementFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetElement: build.query<GetElementQuery, GetElementQueryVariables>({
      query: (variables) => ({ document: GetElementGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetElementQuery, useLazyGetElementQuery } = injectedRtkApi;


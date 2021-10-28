import * as Types from '@codelab/shared/codegen/graphql';

import { FieldFragment } from '../../../graphql/Field.fragment.graphql.gen';
import { FieldFragmentDoc } from '../../../graphql/Field.fragment.graphql.gen';
import { api } from '@codelab/frontend/model/infra/api';
export type GetFieldQueryVariables = Types.Exact<{
  input: Types.GetFieldInput;
}>;


export type GetFieldQuery = { getField?: FieldFragment | null | undefined };


export const GetFieldGql = `
    query GetField($input: GetFieldInput!) {
  getField(input: $input) {
    ...Field
  }
}
    ${FieldFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetField: build.query<GetFieldQuery, GetFieldQueryVariables>({
      query: (variables) => ({ document: GetFieldGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetFieldQuery, useLazyGetFieldQuery } = injectedRtkApi;


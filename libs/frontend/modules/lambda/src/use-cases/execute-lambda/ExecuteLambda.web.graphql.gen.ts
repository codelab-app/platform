import * as Types from '@codelab/shared/codegen/graphql';

import { LambdaPayloadFragment } from '../../graphql/LambdaPayload.fragment.graphql.gen';
import { LambdaPayloadFragmentDoc } from '../../graphql/LambdaPayload.fragment.graphql.gen';
import { api } from '@codelab/shared/codegen/graphql';
export type ExecuteLambdaMutationVariables = Types.Exact<{
  input: Types.ExecuteLambdaInput;
}>;


export type ExecuteLambdaMutation = { executeLambda?: LambdaPayloadFragment | null | undefined };


export const ExecuteLambdaGql = `
    mutation ExecuteLambda($input: ExecuteLambdaInput!) {
  executeLambda(input: $input) {
    ...LambdaPayload
  }
}
    ${LambdaPayloadFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    ExecuteLambda: build.mutation<ExecuteLambdaMutation, ExecuteLambdaMutationVariables>({
      query: (variables) => ({ document: ExecuteLambdaGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useExecuteLambdaMutation } = injectedRtkApi;


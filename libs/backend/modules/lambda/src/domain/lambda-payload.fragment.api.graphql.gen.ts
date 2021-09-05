import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
export type TestLambdaPayloadFragment = { payload: string };

export const TestLambdaPayloadFragmentDoc = gql`
    fragment TestLambdaPayload on LambdaPayload {
  payload
}
    `;
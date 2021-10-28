import * as Types from '@codelab/shared/codegen/graphql';

export type TestLambdaPayloadFragment = { payload: string };

export const TestLambdaPayloadFragmentDoc = `
    fragment TestLambdaPayload on LambdaPayload {
  payload
}
    `;
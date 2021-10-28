import * as Types from '@codelab/shared/codegen/graphql';

export type LambdaFragment = { id: string, name: string, body: string };

export type LambdaPayloadFragment = { payload: string };

export const LambdaFragmentDoc = `
    fragment Lambda on Lambda {
  id
  name
  body
}
    `;
export const LambdaPayloadFragmentDoc = `
    fragment LambdaPayload on LambdaPayload {
  payload
}
    `;
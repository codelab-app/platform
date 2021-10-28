import * as Types from '@codelab/shared/codegen/graphql';

export type TestLambdaFragment = { id: string, name: string, body: string };

export const TestLambdaFragmentDoc = `
    fragment TestLambda on Lambda {
  id
  name
  body
}
    `;
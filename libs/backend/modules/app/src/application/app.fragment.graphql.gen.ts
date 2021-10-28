import * as Types from '@codelab/shared/codegen/graphql';

export type TestAppFragment = { id: string, name: string, ownerId: string };

export const TestAppFragmentDoc = `
    fragment TestApp on App {
  id
  name
  ownerId
}
    `;
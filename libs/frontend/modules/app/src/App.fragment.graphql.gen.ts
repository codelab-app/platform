import * as Types from '@codelab/shared/codegen/graphql';

export type AppFragment = { id: string, ownerId: string, name: string };

export type AppBaseFragment = { id: string, ownerId: string, name: string };

export const AppFragmentDoc = `
    fragment App on App {
  id
  ownerId
  name
}
    `;
export const AppBaseFragmentDoc = `
    fragment AppBase on App {
  id
  ownerId
  name
}
    `;
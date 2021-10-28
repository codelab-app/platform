import * as Types from '@codelab/shared/codegen/graphql';

export type TestTagFragment = { __typename: 'Tag', id: string, name: string, isRoot: boolean };

export const TestTagFragmentDoc = `
    fragment TestTag on Tag {
  __typename
  id
  name
  isRoot
}
    `;
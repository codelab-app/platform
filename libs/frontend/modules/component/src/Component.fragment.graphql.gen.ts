import * as Types from '@codelab/shared/codegen/graphql';

export type ComponentFragment = { __typename: 'Component', id: string, name: string };

export const ComponentFragmentDoc = `
    fragment Component on Component {
  __typename
  id
  name
}
    `;
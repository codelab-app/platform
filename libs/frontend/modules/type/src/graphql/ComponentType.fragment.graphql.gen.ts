import * as Types from '@codelab/shared/codegen/graphql';

export type ComponentTypeFragment = { id: string, name: string };

export const ComponentTypeFragmentDoc = `
    fragment ComponentType on ComponentType {
  id
  name
}
    `;
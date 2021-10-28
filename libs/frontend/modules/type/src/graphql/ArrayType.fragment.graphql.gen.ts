import * as Types from '@codelab/shared/codegen/graphql';

export type ArrayTypeFragment = { id: string, name: string };

export const ArrayTypeFragmentDoc = `
    fragment ArrayType on ArrayType {
  id
  name
}
    `;
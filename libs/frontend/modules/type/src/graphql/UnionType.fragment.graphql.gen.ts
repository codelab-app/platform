import * as Types from '@codelab/shared/codegen/graphql';

export type UnionTypeFragment = { id: string, name: string, typeIdsOfUnionType: Array<string> };

export const UnionTypeFragmentDoc = `
    fragment UnionType on UnionType {
  id
  name
  typeIdsOfUnionType
}
    `;
import * as Types from '@codelab/shared/codegen/graphql';

export type ElementTypeFragment = { id: string, name: string, kind: Types.ElementTypeKind };

export const ElementTypeFragmentDoc = `
    fragment ElementType on ElementType {
  id
  name
  kind
}
    `;
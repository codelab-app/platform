import * as Types from '@codelab/shared/codegen/graphql';

export type PrimitiveTypeFragment = { id: string, name: string, primitiveKind: Types.PrimitiveKind };

export const PrimitiveTypeFragmentDoc = `
    fragment PrimitiveType on PrimitiveType {
  id
  name
  primitiveKind
}
    `;
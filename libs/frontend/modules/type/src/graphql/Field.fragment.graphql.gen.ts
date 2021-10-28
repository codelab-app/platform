import * as Types from '@codelab/shared/codegen/graphql';

export type FieldFragment = { id: string, key: string, name?: string | null | undefined, description?: string | null | undefined };

export const FieldFragmentDoc = `
    fragment Field on Field {
  id
  key
  name
  description
}
    `;
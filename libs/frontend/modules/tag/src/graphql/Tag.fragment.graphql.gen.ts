import * as Types from '@codelab/shared/codegen/graphql';

export type TagFragment = { id: string, name: string };

export const TagFragmentDoc = `
    fragment Tag on Tag {
  id
  name
}
    `;
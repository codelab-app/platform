import * as Types from '@codelab/shared/codegen/graphql';

export type PageBaseFragment = { id: string, name: string };

export const PageBaseFragmentDoc = `
    fragment PageBase on Page {
  id
  name
}
    `;
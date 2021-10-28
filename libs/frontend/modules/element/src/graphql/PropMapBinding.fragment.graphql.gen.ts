import * as Types from '@codelab/shared/codegen/graphql';

export type PropMapBindingFragment = { id: string, sourceKey: string, targetElementId?: string | null | undefined, targetKey: string };

export const PropMapBindingFragmentDoc = `
    fragment PropMapBinding on PropMapBinding {
  id
  sourceKey
  targetElementId
  targetKey
}
    `;
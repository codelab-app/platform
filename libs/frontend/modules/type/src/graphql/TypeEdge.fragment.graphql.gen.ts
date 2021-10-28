import * as Types from '@codelab/shared/codegen/graphql';

import { FieldFragment } from './Field.fragment.graphql.gen';
import { FieldFragmentDoc } from './Field.fragment.graphql.gen';
export type TypeEdgeFragment = { source: string, target: string, kind: Types.TypeEdgeKind, field?: FieldFragment | null | undefined };

export const TypeEdgeFragmentDoc = `
    fragment TypeEdge on TypeEdge {
  source
  target
  kind
  field {
    ...Field
  }
}
    ${FieldFragmentDoc}`;
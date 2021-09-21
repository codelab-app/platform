import * as Types from '@codelab/shared/codegen/graphql';

import { FieldFragment } from './Field.fragment.web.graphql.gen';
import { gql } from '@apollo/client';
import { FieldFragmentDoc } from './Field.fragment.web.graphql.gen';
export type TypeEdgeFragment = { source: string, target: string, kind: Types.TypeEdgeKind, field?: Types.Maybe<FieldFragment> };

export const TypeEdgeFragmentDoc = gql`
    fragment TypeEdge on TypeEdge {
  source
  target
  kind
  field {
    ...Field
  }
}
    ${FieldFragmentDoc}`;
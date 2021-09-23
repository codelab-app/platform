import * as Types from '@codelab/shared/codegen/graphql';

import { PageBaseFragment } from './PageBase.fragment.web.graphql.gen';
import { ElementGraphFragment } from '../../../element/src/graphql/ElementGraph.fragment.web.graphql.gen';
import { gql } from '@apollo/client';
import { PageBaseFragmentDoc } from './PageBase.fragment.web.graphql.gen';
import { ElementGraphFragmentDoc } from '../../../element/src/graphql/ElementGraph.fragment.web.graphql.gen';
export type PageFullFragment = (
  { elements?: Types.Maybe<ElementGraphFragment> }
  & PageBaseFragment
);

export const PageFullFragmentDoc = gql`
    fragment PageFull on Page {
  ...PageBase
  elements {
    ...ElementGraph
  }
}
    ${PageBaseFragmentDoc}
${ElementGraphFragmentDoc}`;
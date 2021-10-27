import * as Types from '@codelab/shared/codegen/graphql';

import { PageBaseFragment } from './PageBase.fragment.graphql.gen';
import { ElementGraphFragment } from '../../../element/src/graphql/ElementGraph.fragment.graphql.gen';
import { gql } from '@apollo/client';
import { PageBaseFragmentDoc } from './PageBase.fragment.graphql.gen';
import { ElementGraphFragmentDoc } from '../../../element/src/graphql/ElementGraph.fragment.graphql.gen';
export type PageFullFragment = (
  { elements?: ElementGraphFragment | null | undefined }
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
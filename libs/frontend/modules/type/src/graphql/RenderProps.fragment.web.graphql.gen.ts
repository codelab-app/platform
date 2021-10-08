import * as Types from '@codelab/frontend/abstract/codegen';

import { gql } from '@apollo/client';
export type RenderPropsTypeFragment = { id: string, name: string };

export const RenderPropsTypeFragmentDoc = gql`
    fragment RenderPropsType on RenderPropsType {
  id
  name
}
    `;

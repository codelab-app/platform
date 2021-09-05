import * as Types from '@codelab/shared/codegen/graphql';

import { EnumTypeValueFragment } from './EnumTypeValue.fragment.api.graphql.gen';
import { gql } from '@apollo/client';
import { EnumTypeValueFragmentDoc } from './EnumTypeValue.fragment.api.graphql.gen';
export type EnumTypeFragment = { id: string, name: string, allowedValues: Array<EnumTypeValueFragment> };

export const EnumTypeFragmentDoc = gql`
    fragment EnumType on EnumType {
  id
  name
  allowedValues {
    ...EnumTypeValue
  }
}
    ${EnumTypeValueFragmentDoc}`;
import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
export type EnumTypeValueFragment = { id: string, name?: Types.Maybe<string>, value: string };

export const EnumTypeValueFragmentDoc = gql`
    fragment EnumTypeValue on EnumTypeValue {
  id
  name
  value
}
    `;
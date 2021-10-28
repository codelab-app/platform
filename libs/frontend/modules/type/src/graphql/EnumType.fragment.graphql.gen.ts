import * as Types from '@codelab/shared/codegen/graphql';

import { EnumTypeValueFragment } from './EnumTypeValue.fragment.graphql.gen';
import { EnumTypeValueFragmentDoc } from './EnumTypeValue.fragment.graphql.gen';
export type EnumTypeFragment = { id: string, name: string, allowedValues: Array<EnumTypeValueFragment> };

export const EnumTypeFragmentDoc = `
    fragment EnumType on EnumType {
  id
  name
  allowedValues {
    ...EnumTypeValue
  }
}
    ${EnumTypeValueFragmentDoc}`;
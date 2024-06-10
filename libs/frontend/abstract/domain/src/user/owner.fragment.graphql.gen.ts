import * as Types from '@codelab/shared/abstract/codegen'

import { fetchParams } from '@codelab/shared/config'
export type OwnerFragment = { id: string }

export const OwnerFragmentDoc = `
    fragment Owner on User {
  id
}
    `

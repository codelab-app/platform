import * as Types from '@codelab/shared/abstract/codegen'

import { fetchParams } from '@codelab/shared/config'
export type DomainFragment = {
  id: string
  name: string
  app: { id: string }
  domainConfig: { misconfigured: boolean }
}

export const DomainFragmentDoc = `
    fragment Domain on Domain {
  app {
    id
  }
  domainConfig {
    misconfigured
  }
  id
  name
}
    `

import * as Types from '@codelab/shared/abstract/codegen'

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

import type { Domain } from '@codelab/backend/abstract/codegen'
import type { IFieldResolver } from '@graphql-tools/utils'

export const domainConfig: IFieldResolver<Domain, unknown, unknown> = async ({
  name,
}) => {
  return { misconfigured: false }
}

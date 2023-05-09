import type { Domain } from '@codelab/backend/abstract/codegen'
import { vercelApis } from '@codelab/backend/infra/adapter/vercel'
import type { IFieldResolver } from '@graphql-tools/utils'

export const domainConfig: IFieldResolver<Domain, unknown, unknown> = async ({
  name,
}) => {
  const res = await vercelApis.domain.getDomainConfig(name)

  // await handleAPIError(res, 'getConfig - vercel')
  if (!res.ok) {
    return { misconfigured: false }
  }

  return await res.json()
}

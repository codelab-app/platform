import { vercelApis } from '@codelab/backend/infra/adapter/vercel'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { IFieldResolver } from '@graphql-tools/utils'

export const domainConfig: IFieldResolver<
  OGM_TYPES.Domain,
  unknown,
  unknown
> = async ({ name }) => {
  const res = await vercelApis.domain.getDomainConfig(name)
  // await handleAPIError(res, 'getConfig - vercel')

  return await res.json()
}

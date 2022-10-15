import { OGM_TYPES } from '@codelab/backend/abstract/codegen'
import { vercelApis } from '@codelab/backend/infra/adapter/vercel'
import { IFieldResolver } from '@graphql-tools/utils'

export const domainConfig: IFieldResolver<
  OGM_TYPES.Domain,
  unknown,
  unknown
> = async ({ name }) => {
  const res = await vercelApis.domain.getDomainConfig(name)
  // await handleAPIError(res, 'getConfig - vercel')

  return await res.json()
}

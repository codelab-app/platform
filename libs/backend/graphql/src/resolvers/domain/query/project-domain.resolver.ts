import type { OGM_TYPES } from '@codelab/backend/abstract/codegen'
import { vercelApis } from '@codelab/backend/infra/adapter/vercel'

export const projectDomain = async ({ name }: OGM_TYPES.Domain) => {
  const res = await vercelApis.domain.getProjectDomain(name)
  // await handleAPIError(res, 'getProjectDomain - vercel')

  return await res.json()
}

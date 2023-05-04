import { vercelApis } from '@codelab/backend/infra/adapter/vercel'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'

export const projectDomain = async ({ name }: OGM_TYPES.Domain) => {
  const res = await vercelApis.domain.getProjectDomain(name)

  // await handleAPIError(res, 'getProjectDomain - vercel')
  if (!res.ok) {
    return { verified: false }
  }

  return await res.json()
}

import type { Domain } from '@codelab/backend/abstract/codegen'
import { vercelApis } from '@codelab/backend/infra/adapter/vercel'

export const projectDomain = async ({ name }: Domain) => {
  const res = await vercelApis.domain.getProjectDomain(name)

  // await handleAPIError(res, 'getProjectDomain - vercel')
  if (!res.ok) {
    return { verified: false }
  }

  return await res.json()
}

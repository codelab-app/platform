import { vercelApis } from '@codelab/backend/adapter/vercel'
import { IDomain } from '@codelab/shared/abstract/core'
import { handleAPIError } from '../../utils/handleAPIError'

export const projectDomain = async (parent: IDomain) => {
  const name = parent.name
  const res = await vercelApis.domain.getProjectDomain(name)
  await handleAPIError(res, 'getProjectDomain - vercel')

  const body = await res.json()

  return body
}

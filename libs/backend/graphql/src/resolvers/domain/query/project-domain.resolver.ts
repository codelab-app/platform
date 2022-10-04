import { OGM_TYPES } from '@codelab/backend/abstract/codegen'
import { vercelApis } from '@codelab/backend/infra/adapter/vercel'
import { handleAPIError } from '../../utils/handleAPIError'

export const projectDomain = async (parent: OGM_TYPES.Domain) => {
  const name = parent.name
  const res = await vercelApis.domain.getProjectDomain(name)
  await handleAPIError(res, 'getProjectDomain - vercel')

  const body = await res.json()

  return body
}

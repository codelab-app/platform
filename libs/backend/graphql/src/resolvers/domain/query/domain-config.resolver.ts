import { OGM_TYPES } from '@codelab/backend/abstract/codegen'
import { vercelApis } from '@codelab/backend/infra/adapter/vercel'
import { handleAPIError } from '../../utils/handleAPIError'

export const domainConfig = async (parent: OGM_TYPES.Domain) => {
  const name = parent.name
  const res = await vercelApis.domain.getConfig(name)
  await handleAPIError(res, 'getConfig - vercel')

  const body = await res.json()

  return body
}

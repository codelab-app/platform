import { vercelApis } from '@codelab/backend/adapter/vercel'
import { IDomain } from '@codelab/shared/abstract/core'
import { handleAPIError } from '../../utils/handleAPIError'

export const domainConfig = async (parent: IDomain) => {
  const name = parent.name
  const res = await vercelApis.domain.getConfig(name)
  await handleAPIError(res, 'getConfig - vercel')

  const body = await res.json()

  return body
}

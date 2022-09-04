import { vercelApis } from '@codelab/backend/adapter/vercel'
import { handleAPIError } from '../../utils/handleAPIError'

export const domainConfig = async (source: any) => {
  const name = source.name
  const res = await vercelApis.domain.getConfig(name)
  const body = await res.json()
  handleAPIError(res, body, 'getDomainConfig - vercel')

  return body
}

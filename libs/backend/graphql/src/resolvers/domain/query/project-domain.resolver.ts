import { vercelApis } from '@codelab/backend/adapter/vercel'
import { handleAPIError } from '../../utils/handleAPIError'

export const projectDomain = async (source: any) => {
  const name = source.name
  const res = await vercelApis.domain.getProjectDomain(name)
  const body = await res.json()
  handleAPIError(res, body, 'getDomainData - vercel')

  return body
}

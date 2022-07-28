import { vercelApis } from '@codelab/backend'
import { handleRestError } from '../../../utils/handleRestError'

export const domainConfig = async (source: any) => {
  const name = source.name
  const res = await vercelApis.domain.getConfig(name)
  const body = await res.json()
  handleRestError(res, body, 'getDomainConfig - vercel')

  return body
}

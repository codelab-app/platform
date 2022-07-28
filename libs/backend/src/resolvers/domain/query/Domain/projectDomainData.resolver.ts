import { vercelApis } from '../../../../api'
import { handleRestError } from '../../../utils/handleRestError'

export const projectDomainData = async (source: any) => {
  const name = source.name
  const res = await vercelApis.domain.getProjectData(name)
  const body = await res.json()
  handleRestError(res, body, 'getDomainData - vercel')

  return body
}

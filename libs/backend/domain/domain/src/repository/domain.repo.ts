import type { IDomainOutputDto } from '@codelab/backend/abstract/core'
import {
  PROJECT_NOT_FOUND,
  vercelApis,
} from '@codelab/backend/infra/adapter/vercel'

/**
 * If response is 200, we log error & return false
 */
export const logAPIError = async (
  res: Response,
  requestName: string,
): Promise<boolean> => {
  if (res.status !== 200) {
    let parsedBody = {}

    try {
      parsedBody = await res.json()
      // eslint-disable-next-line no-empty
    } catch {}

    console.error(
      `[${requestName}] Fail to make request. Response: ${JSON.stringify(
        parsedBody,
        null,
        2,
      )}`,
    )

    return false
  }

  return true
}

/**
 * Add Vercel domain if doesn't already exist.
 *
 * @return throws if due to error
 */
export const addVercelDomain = async (
  domain: IDomainOutputDto,
): Promise<boolean> => {
  const getProjectDomainResponse = await vercelApis.domain.getProjectDomain(
    domain.name,
  )

  /**
   * Add domain if project not found
   */
  if (getProjectDomainResponse.status === PROJECT_NOT_FOUND) {
    const addDomainResponse = await vercelApis.domain.addDomain(domain.name)

    return await logAPIError(addDomainResponse, 'addDomain')
  }

  return await logAPIError(getProjectDomainResponse, 'getProjectDomain')
}

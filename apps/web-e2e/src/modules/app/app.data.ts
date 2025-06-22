import type {
  IApp,
  IAtomType,
  IComponentType,
  IPageCreateSeedData,
} from '@codelab/shared-abstract-core'
import type { APIRequestContext } from '@playwright/test'

import { logTimestamp } from '@codelab/shared-infra-logging'

import { jobOutputRequest } from '../../job-request'
import { REQUEST_TIMEOUT } from '../../setup/config'

/**
 * Not used by app spec, but we still put it here for organization
 */
export const seedAppData = async (
  request: APIRequestContext,
  data: {
    page?: IPageCreateSeedData
    // Make this required so we don't seed all types
    atomTypes: Array<IAtomType>
    componentTypes: Array<IComponentType>
  },
) => {
  logTimestamp('Seeding app data...')

  const results = await jobOutputRequest<IApp>(request, 'app/seed-e2e-app', {
    data,
    timeout: REQUEST_TIMEOUT,
  })

  return results.data
}

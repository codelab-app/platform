import type { IResource } from '@codelab/shared/abstract/core'
import type { APIRequestContext } from '@playwright/test'

import { ResourceType } from '@codelab/shared/infra/gqlgen'
import { v4 } from 'uuid'

import { REQUEST_TIMEOUT } from '../../setup/config'

export const resourceName = 'Test Resource'

export const seedResourceData = async (request: APIRequestContext) => {
  const ownerResponse = await request.get('/api/v1/user/me', {
    timeout: REQUEST_TIMEOUT,
  })

  const owner = await ownerResponse.json()

  const response = await request.post('/api/v1/resource/create-resource', {
    data: {
      config: {
        url: 'https://test.com',
      },
      id: v4(),
      name: resourceName,
      owner: { id: owner.id },
      type: ResourceType.Rest,
    },
    timeout: REQUEST_TIMEOUT,
  })

  if (!response.ok()) {
    const text = await response.text()

    console.error('Server response:', text)
    throw new Error(`HTTP error! status: ${response.status()}`)
  }

  return response.json() as Promise<IResource>
}

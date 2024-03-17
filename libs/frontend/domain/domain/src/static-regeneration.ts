// eslint-disable-next-line @nx/enforce-module-boundaries
import type { IAppService } from '@codelab/frontend/abstract/application'
import type { IAppModel } from '@codelab/frontend/abstract/domain'
import {
  useErrorNotify,
  useSuccessNotify,
} from '@codelab/frontend/shared/utils'
import { getEnv } from '@codelab/shared/config'
import { useState } from 'react'

// makes a call to the platform backend where session is checked
// and request will be redirected to appropriate user domain
export const regeneratePages = async (pages: Array<string>, domain: string) => {
  const baseUrl = getEnv().endpoint.platformHost
  const pagesParam = pages.join(',')
  const protocol = baseUrl.startsWith('http') ? '' : 'https://'

  const response = await fetch(
    `${protocol}${baseUrl}/api/regenerate?domain=${domain}&pages=${pagesParam}`,
  )

  if (response.ok) {
    return response.json()
  }

  const error = await response.text()

  throw new Error(error)
}

export const useRegeneratePages = (appService: IAppService) => {
  const [isRegenerating, setIsRegenerating] = useState(false)

  const successNotify = useSuccessNotify({
    description: 'It might take up to an hour for the changes to be visible',
    title: 'App was successfully rebuilt',
  })

  const errorNotify = useErrorNotify({
    description: (error: Error) => error.message,
    title: 'Error while rebuilding app',
  })

  const regenerate = async (app: IAppModel, pagesUrls?: Array<string>) => {
    try {
      setIsRegenerating(true)
      await appService.regeneratePages(app, pagesUrls)
      successNotify()
    } catch (error) {
      errorNotify(error as Error)
    } finally {
      setIsRegenerating(false)
    }
  }

  return { isRegenerating, regenerate }
}

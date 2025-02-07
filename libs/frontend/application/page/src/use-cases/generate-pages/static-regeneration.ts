import type { IAppModel } from '@codelab/frontend/abstract/domain'

import {
  useErrorNotify,
  useSuccessNotify,
} from '@codelab/frontend/infra/context'
import { domainRepository } from '@codelab/frontend-domain-domain/repositories'
import { getEnv } from '@codelab/shared/config/env'
import { useState } from 'react'

// makes a call to the api backend where session is checked
// and request will be redirected to appropriate user domain
export const regeneratePages = async (pages: Array<string>, domain: string) => {
  const baseUrl = getEnv().endpoint.webHost
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

export const useRegeneratePages = () => {
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

      const { items: domains } = await domainRepository.find({
        app: { id: app.id },
      })

      for (const domain of domains) {
        const pages =
          pagesUrls ?? app.pages.map((page) => page.current.urlPattern)

        await regeneratePages(pages, domain.name)
      }

      successNotify()
    } catch (error) {
      errorNotify(error as Error)
    } finally {
      setIsRegenerating(false)
    }
  }

  return { isRegenerating, regenerate }
}

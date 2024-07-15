import type { IAppModel } from '@codelab/frontend/abstract/domain'
import {
  useErrorNotify,
  useSuccessNotify,
} from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'
import { useState } from 'react'
import { buildAppUseCase } from './build-app.use-case'

export const useBuildApp = () => {
  const { domainDomainService } = useDomainStore()
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

      const domains = domainDomainService.domainsList.filter(
        (_domain) => _domain.app.id === app.id,
      )

      // if (!domains.length) {
      //   domains = (await domainListUseCase(app)).domains.map((domain) => {
      //     return domainDomainService.hydrate(domain)
      //   })
      // }

      for (const domain of domains) {
        const pages = pagesUrls ?? app.pages.map((page) => page.urlPattern)

        await buildAppUseCase(pages, domain.name)
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

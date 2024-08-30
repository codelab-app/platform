import { type IAppService } from '@codelab/frontend/abstract/application'
import type {
  IAppModel,
  ICreateAppData,
  IUpdateAppData,
} from '@codelab/frontend/abstract/domain'
import { regeneratePages } from '@codelab/frontend-application-page/use-cases/generate-pages'
import {
  appRepository,
  invalidateAppListQuery,
} from '@codelab/frontend-domain-app/repositories'
import { domainRepository } from '@codelab/frontend-domain-domain/repositories'
import { elementRepository } from '@codelab/frontend-domain-element/repositories'
import { pageRepository } from '@codelab/frontend-domain-page/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import type { IUpdatePageData } from '@codelab/shared/abstract/core'
import type { AppWhere } from '@codelab/shared/infra/gql'
import { Validator } from '@codelab/shared/infra/schema'

export const useAppService = (): IAppService => {
  const { appDomainService, pageDomainService, userDomainService } =
    useDomainStore()

  const create = async ({ id, name }: ICreateAppData) => {
    const app = appDomainService.create({
      id,
      name,
      owner: userDomainService.user,
      pages: [],
    })

    await appRepository.add(app)

    await invalidateAppListQuery()

    return app
  }

  const remove = async (apps: Array<IAppModel>): Promise<number> => {
    const deleteApp = async (app: IAppModel) => {
      /**
       * Optimistic update.
       * Detach pages before detaching app from root store to avoid script error.
       */
      app.pages.forEach((page) => {
        pageDomainService.pages.delete(page.id)
      })
      appDomainService.apps.delete(app.id)

      /**
       * Get all pages to delete
       */
      const { items: pages } = await pageRepository.find({
        appConnection: { node: { id: app.id } },
      })

      // Need to load elements as well
      const elements = pages.flatMap((page) => page.rootElement)

      await elementRepository.delete(elements)
      await appRepository.delete([app])

      await invalidateAppListQuery()

      return app
    }

    const deletedApps = await Promise.all(apps.map((app) => deleteApp(app)))

    return deletedApps.length
  }

  const getAll = async (where: AppWhere) => {
    const { items: apps } = await appRepository.find(where)

    return apps.map((app) => appDomainService.hydrate(app))
  }

  const getOne = async (id: string) => {
    const [app] = await getAll({ id })

    return app
  }

  const getSelectAppOptions = async () => {
    await getAll({})

    return appDomainService.appsList.map((app) => ({
      label: app.name,
      value: app.id,
    }))
  }

  /**
   * This is used for the apps list preview
   *
   * 1) We require the first page to create a URL
   */
  // const loadAppsPreview = async (where: AppWhere) => {
  //   const { apps, atoms } = await appRepository.find(where)

  //   atoms.forEach((atom) => atomDomainService.hydrate(atom))

  //   // hydrate pages to use the first page's url
  //   apps
  //     .flatMap((app) => app.pages)
  //     .forEach((page) => {
  //       pageDomainService.hydrate(page)
  //     })

  //   apps
  //     .flatMap((app) => app.domains)
  //     .forEach((domain) => {
  //       domainDomainService.hydrate(domain)
  //     })

  //   return apps.map((app) => {
  //     return appDomainService.hydrate(app)
  //   })
  // }

  const update = async ({ id, name }: IUpdateAppData) => {
    const app = appDomainService.apps.get(id)

    Validator.assertsDefined(app)

    app.writeCache({ name })

    await appRepository.update(app)

    await invalidateAppListQuery()

    return app
  }

  const updatePage = async (data: IUpdatePageData) => {
    const app = appDomainService.apps.get(data.app.id)
    const page = app?.page(data.id)
    const { name, pageContentContainer, urlPattern } = data

    page?.writeCache({
      app,
      name,
      pageContentContainer,
      urlPattern,
    })

    if (page) {
      await pageRepository.update(page)
    }

    return
  }

  const regeneratePagesForApp = async (
    app: IAppModel,
    pagesUrls?: Array<string>,
  ) => {
    const { items: domains } = await domainRepository.find({
      app: { id: app.id },
    })

    for (const domain of domains) {
      const pages = pagesUrls ?? app.pages.map((page) => page.urlPattern)

      await regeneratePages(pages, domain.name)
    }
  }

  return {
    create,
    getAll,
    getOne,
    regeneratePages: regeneratePagesForApp,
    remove,
    update,
    updatePage,
  }
}

import type {
  IAppCreateFormData,
  IAppModel,
  IAppUpdateFormData,
} from '@codelab/frontend/abstract/domain'
import type {
  IAppDto,
  IPageUpdateFormData,
  IRef,
} from '@codelab/shared/abstract/core'
import type { AppWhere } from '@codelab/shared/infra/gql'

import { type IAppService } from '@codelab/frontend/abstract/application'
import { usePageService } from '@codelab/frontend-application-page/services'
import { regeneratePages } from '@codelab/frontend-application-page/use-cases/generate-pages'
import {
  appRepository,
  invalidateAppListQuery,
} from '@codelab/frontend-domain-app/repositories'
import { domainRepository } from '@codelab/frontend-domain-domain/repositories'
import { pageRepository } from '@codelab/frontend-domain-page/repositories'
import { PageDomainFactory } from '@codelab/frontend-domain-page/services'
import {
  useDomainStore,
  useUndoManager,
} from '@codelab/frontend-infra-mobx/context'
import { Validator } from '@codelab/shared/infra/schema'
import { withAsyncSpanFunc } from '@codelab/shared-infra-sentry'
import { computed, type IComputedValueOptions } from 'mobx'
import { type DependencyList, useMemo } from 'react'

import { createAppAction } from '../use-cases/create-app'

export const useAppService = (): IAppService => {
  const {
    appDomainService,
    atomDomainService,
    pageDomainService,
    userDomainService,
  } = useDomainStore()

  const pageService = usePageService()
  const undoManager = useUndoManager()
  const pageFactory = new PageDomainFactory(userDomainService.user)
  const user = userDomainService.user
  const owner = { id: user.id }

  const create = async ({ id, name }: IAppCreateFormData) => {
    try {
      const renderType = atomDomainService.defaultRenderType

      const pages = pageFactory.addSystemPages(
        { id, name },
        { __typename: renderType.__typename, id: renderType.id },
      )

      const app = await createAppAction(
        { id, name, owner, pages },
        pages.flatMap((page) => page.rootElement),
        pages.flatMap((page) => page.store),
        pages.flatMap((page) => page.storeApi),
      )

      Validator.assertsDefined(app)

      return app
    } catch (error) {
      undoManager.undo()

      throw error
    } finally {
      await invalidateAppListQuery()
    }
  }

  const removeMany = async (apps: Array<IAppModel>): Promise<number> => {
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
      const { items: pagesDto } = await pageRepository.find({
        appConnection: { node: { id: app.id } },
      })

      const pages = pagesDto.map((pageDto) =>
        pageDomainService.hydrate(pageDto),
      )

      await pageService.removeMany(pages)

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

  const update = async ({ id, name }: IAppUpdateFormData) => {
    const app = await appRepository.update({ id }, { id, name, owner })

    await invalidateAppListQuery()

    Validator.assertsDefined(app)

    return app
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

  const appList = useComputed(() => appDomainService.appsList)

  const getAllFromCache = () => {
    return appDomainService.appsList
  }

  const getOneFromCache = (ref: IRef) => {
    return appDomainService.apps.get(ref.id)
  }

  return {
    appList,
    create: withAsyncSpanFunc({ name: 'AppCreate' }, create),
    getAll,
    getAllFromCache,
    getOne,
    getOneFromCache,
    regeneratePages: regeneratePagesForApp,
    removeMany: withAsyncSpanFunc({ name: 'AppRemoveMany' }, removeMany),
    update,
  }
}

// changes to "options" argument are ignored
export const useComputed = <T>(
  func: () => T,
  options?: IComputedValueOptions<T>,
  deps?: DependencyList,
) => {
  return useMemo(() => computed(func, options), deps ?? []).get()
}

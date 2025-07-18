import type {
  IAppCreateFormData,
  IAppModel,
  IAppUpdateFormData,
} from '@codelab/frontend-abstract-domain'
import type { AppWhere } from '@codelab/shared-infra-gqlgen'

import { type IAppService } from '@codelab/frontend-abstract-application'
import { regeneratePages } from '@codelab/frontend-application-page/use-cases/generate-pages'
import { appRepository } from '@codelab/frontend-domain-app/repositories'
import { domainRepository } from '@codelab/frontend-domain-domain/repositories'
import { elementRepository } from '@codelab/frontend-domain-element/repositories'
import { pageRepository } from '@codelab/frontend-domain-page/repositories'
import { PageDomainFactory } from '@codelab/frontend-domain-page/services'
import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { useDomainStoreHydrator } from '@codelab/frontend-infra-context'
import {
  useDomainStore,
  useUndoManager,
} from '@codelab/frontend-infra-mobx-context'
import { appApi } from '@codelab/shared-domain-module-app'
import { Validator } from '@codelab/shared-infra-typebox'

import { createAppAction } from '../use-cases/create-app'
import { AppFactory } from './app.factory'

export const useAppService = (): IAppService => {
  const {
    appDomainService,
    atomDomainService,
    pageDomainService,
    userDomainService,
  } = useDomainStore()

  const undoManager = useUndoManager()

  const pageFactory = new PageDomainFactory(
    userDomainService.currentUser.toJson,
  )

  const user = userDomainService.currentUser.toJson
  const owner = user
  const appFactory = new AppFactory(pageFactory)
  const hydrate = useDomainStoreHydrator()

  const create = async (data: IAppCreateFormData) => {
    const defaultRenderType = atomDomainService.defaultRenderType

    try {
      // render type should be plain object, not MobX model,
      // otherwise would fail to be passed to server action.
      const { __typename, id } = defaultRenderType
      const appAggregate = appFactory.create(data, { __typename, id }, owner)

      hydrate(appAggregate)

      const app = await createAppAction(appAggregate)

      Validator.assertsDefined(app)

      return app
    } catch (error) {
      console.log(error)
      undoManager.undo()

      throw error
    } finally {
      //
    }
  }

  const removeMany = async (apps: Array<IAppModel>): Promise<number> => {
    const deleteApp = async (app: IAppModel) => {
      /**
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

      const elements = pagesDto.flatMap((page) => page.elements)

      await appRepository.delete([app], {
        revalidateTags: [CACHE_TAGS.App.list()],
      })
      await elementRepository.delete(elements)

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
    const { items: apps } = await appApi().AppList({})

    return apps.map((app) => ({
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
    const app = appDomainService.apps.get(id)

    app?.writeCache({ name })

    await appRepository.update(
      { id },
      { id, name, owner },
      {
        revalidateTags: [CACHE_TAGS.App.list()],
      },
    )

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
      const pages =
        pagesUrls ?? app.pages.map((page) => page.current.urlPattern)

      await regeneratePages(pages, domain.name)
    }
  }

  return {
    create,
    getAll,
    getOne,
    regeneratePages: regeneratePagesForApp,
    removeMany,
    update,
  }
}

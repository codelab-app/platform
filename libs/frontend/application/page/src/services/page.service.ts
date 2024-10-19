import type {
  IPageCreateFormData,
  IElementDto,
  IPropDto,
  IRef,
  IPageUpdateFormData,
} from '@codelab/shared/abstract/core'
import type { PageWhere } from '@codelab/shared/infra/gql'

import { type IPageService } from '@codelab/frontend/abstract/application'
import {
  elementRef,
  type IInterfaceTypeModel,
  type IPageModel,
  typeRef,
} from '@codelab/frontend/abstract/domain'
import { elementRepository } from '@codelab/frontend-domain-element/repositories'
import {
  GetRenderedPage,
  pageRepository,
} from '@codelab/frontend-domain-page/repositories'
import { Store } from '@codelab/frontend-domain-store/store'
import { InterfaceType } from '@codelab/frontend-domain-type/store'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import {
  IElementRenderTypeKind,
  IPageKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { Validator } from '@codelab/shared/infra/schema'
import { slugify } from '@codelab/shared/utils'
import { v4 } from 'uuid'

export const usePageService = (): IPageService => {
  const {
    appDomainService,
    atomDomainService,
    elementDomainService,
    pageDomainService,
    storeDomainService,
    typeDomainService,
    userDomainService,
  } = useDomainStore()

  const { rendererService } = useApplicationStore()

  const getAll = async (where: PageWhere) => {
    const { items: pages } = await pageRepository.find(where)

    return pages.map((page) => pageDomainService.hydrate(page))
  }

  const getOne = async (id: string) => {
    const pages = await getAll({ id })

    return pages[0]
  }

  const getRenderedPage = async (pageId: string) => {
    return await GetRenderedPage({ pageId })
  }

  const getSelectPageOptions = async (appId?: string) => {
    const pages = await getAll({ appConnection: { node: { id: appId } } })

    return pages.map((page) => ({
      label: page.name,
      value: page.id,
    }))
  }

  const getPagesByApp = (appId: string) => {
    return pageDomainService.pagesList.filter((page) => page.app.id === appId)
  }

  const loadElements = (elements: Array<IElementDto>) => {
    elements.forEach((element) => {
      if (element.renderType.__typename === IElementRenderTypeKind.Atom) {
        console.log('AppService.loadPages() element', element)
        elementDomainService.hydrate(element)
      }
    })
  }

  const create = async ({ app, id, name, urlPattern }: IPageCreateFormData) => {
    const rootElementProps: IPropDto = {
      data: '{}',
      id: v4(),
    }

    const rootElement = elementDomainService.hydrate({
      id: v4(),
      name: ROOT_ELEMENT_NAME,
      page: { id },
      props: rootElementProps,
      renderType: atomDomainService.defaultRenderType,
    })

    const appModel = appDomainService.apps.get(app.id)

    Validator.assertsDefined(appModel)

    const userName = userDomainService.user.username

    const interfaceType = typeDomainService.hydrateInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(
        `${appModel.name}(${userName}) ${name} Store`,
      ),
    })

    const store = storeDomainService.hydrate({
      api: typeRef<IInterfaceTypeModel>(interfaceType.id),
      id: v4(),
      name: Store.createName({ name }),
    })

    const page = pageDomainService.hydrate({
      app,
      id,
      kind: IPageKind.Regular,
      name,
      rootElement: elementRef(rootElement.id),
      store,
      // for new pages we allow user to omit url, in this case we autogenerate it
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      urlPattern: urlPattern ?? `/${slugify(name)}`,
    })

    await pageRepository.add(page)

    return page

    // revalidateTag(CACHE_TAGS.PAGE_LIST)
  }

  const removeMany = async (pageModels: Array<IPageModel>) => {
    const deletedPages = await Promise.all(
      pageModels.map((page) => remove(page)),
    )

    return deletedPages.length
  }

  const remove = async (pageModel: IPageModel) => {
    const { items: pages } = await pageRepository.find({ id: pageModel.id })
    const elements = pages.flatMap((page) => page.elements)

    elements.forEach((element) =>
      elementDomainService.elements.delete(element.id),
    )

    pages.forEach((page) => {
      rendererService.renderers.delete(page.id)

      pageDomainService.pages.delete(page.id)
    })

    await elementRepository.delete(elements)

    return await pageRepository.delete([pageModel])

    // TODO: refresh pages
  }

  const update = async (data: IPageUpdateFormData) => {
    const app = appDomainService.apps.get(data.app.id)
    const page = app?.page(data.id)
    const { name, pageContentContainer, urlPattern } = data

    Validator.assertsDefined(page)

    page.writeCache({
      app,
      name,
      pageContentContainer,
      urlPattern,
    })

    await pageRepository.update(page, {
      id: page.id,
    })

    return page
  }

  const getOneFromCache = (ref: IRef) => {
    return pageDomainService.pages.get(ref.id)
  }

  const getAllFromCache = () => {
    return Array.from(pageDomainService.pages.values())
  }

  return {
    create,
    getAll,
    getAllFromCache,
    getOne,
    getOneFromCache,
    getPagesByApp,
    getRenderedPage,
    getSelectPageOptions,
    loadElements,
    removeMany,
    update,
  }
}

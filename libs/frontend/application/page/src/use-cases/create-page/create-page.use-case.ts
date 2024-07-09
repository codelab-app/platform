'use server'

import type { ICreatePageUseCase } from '@codelab/frontend/abstract/application'
import {
  CACHE_TAGS,
  elementRef,
  type IDomainStore,
  type IInterfaceTypeModel,
  type IPageDomainService,
  typeRef,
} from '@codelab/frontend/abstract/domain'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { Store } from '@codelab/frontend-domain-store/store'
import { InterfaceType } from '@codelab/frontend-domain-type/store'
import {
  type ICreatePageData,
  type IPageDto,
  IPageKind,
  type IPropDto,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { assertIsDefined, slugify } from '@codelab/shared/utils'
import { revalidateTag } from 'next/cache'
import { v4 } from 'uuid'
import { createPageAction } from './create-page.action'

export const createPageUseCase: ICreatePageUseCase = async (
  { app, id, name, urlPattern }: ICreatePageData,
  {
    appDomainService,
    atomDomainService,
    elementDomainService,
    pageDomainService,
    storeDomainService,
    typeDomainService,
    userDomainService,
  }: IDomainStore,
) => {
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

  assertIsDefined(appModel)

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

  await createPageAction(page.toCreateInput())

  return page

  // revalidateTag(CACHE_TAGS.PAGE_LIST)
}

/* eslint-disable @typescript-eslint/member-ordering */

import type { IAppCreateFormData } from '@codelab/frontend-abstract-domain'
import type { PageDomainFactory } from '@codelab/frontend-domain-page/services'
import type {
  IAppDto,
  IElementDto,
  IElementRenderTypeDto,
  IPageDto,
  IRef,
  IStoreDto,
  ITypeDto,
} from '@codelab/shared-abstract-core'

export interface IAppAggregate {
  appsDto: Array<IAppDto>
  pagesDto: Array<IPageDto>
  elementsDto: Array<IElementDto>
  storesDto: Array<IStoreDto>
  typesDto: Array<ITypeDto>
}

export class AppFactory {
  constructor(private pageFactory: PageDomainFactory) {}

  create(
    appData: IAppCreateFormData,
    renderType: IElementRenderTypeDto,
    owner: IRef,
  ): IAppAggregate {
    const pagesDto = this.pageFactory.addSystemPages(
      { id: appData.id, name: appData.name },
      renderType,
    )

    const appDto: IAppDto = {
      id: appData.id,
      name: appData.name,
      owner,
      pages: pagesDto,
    }

    const elementsDto = pagesDto.flatMap((page) => page.rootElement)
    const storesDto = pagesDto.flatMap((page) => page.store)
    const typesDto = pagesDto.flatMap((page) => page.storeApi)

    return {
      appsDto: [appDto],
      elementsDto,
      pagesDto,
      storesDto,
      typesDto,
    }
  }
}

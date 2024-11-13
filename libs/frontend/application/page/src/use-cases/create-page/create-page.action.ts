'use server'

import type {
  IElementDto,
  IInterfaceTypeDto,
  IPageDto,
  IPropDto,
  IStoreDto,
  IUserDto,
} from '@codelab/shared/abstract/core'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import { elementRepository } from '@codelab/frontend-domain-element/repositories'
import { pageRepository } from '@codelab/frontend-domain-page/repositories'
import { storeRepository } from '@codelab/frontend-domain-store/repositories'
import { typeRepository } from '@codelab/frontend-domain-type/repositories'
import { revalidateTag } from 'next/cache'

export const createPageAction = async (
  pageDto: IPageDto,
  store: IStoreDto,
  storeApi: IInterfaceTypeDto,
  rootElement: IElementDto,
  rootElementProps: IPropDto,
  owner: IUserDto,
) => {
  await typeRepository.add(storeApi)
  await storeRepository.add(store)
  await elementRepository.add(rootElement)

  const page = await pageRepository.add(pageDto)

  revalidateTag(CACHE_TAGS.PAGE_LIST)

  return page
}

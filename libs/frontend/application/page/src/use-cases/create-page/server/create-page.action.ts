'use server'

import type {
  IElementDto,
  IInterfaceTypeDto,
  IPageDto,
  IStoreDto,
} from '@codelab/shared-abstract-core'

import { elementRepository } from '@codelab/frontend-domain-element/repositories'
import { pageRepository } from '@codelab/frontend-domain-page/repositories'
import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { storeRepository } from '@codelab/frontend-domain-store/repositories'
import { typeRepository } from '@codelab/frontend-domain-type/repositories'
import { revalidateTag } from 'next/cache'

export const createPageAction = async (
  pageDto: IPageDto,
  store: IStoreDto,
  storeApi: IInterfaceTypeDto,
  rootElement: IElementDto,
) => {
  await typeRepository.add(storeApi)
  await storeRepository.add(store)
  await elementRepository.add(rootElement)

  const page = await pageRepository.add(pageDto)

  revalidateTag(CACHE_TAGS.Page.list())

  return page
}

'use server'

import type {
  IAppDto,
  IElementDto,
  IInterfaceTypeDto,
  IStoreDto,
} from '@codelab/shared/abstract/core'

import { appRepository } from '@codelab/frontend-domain-app/repositories'
import { elementRepository } from '@codelab/frontend-domain-element/repositories'
import { pageRepository } from '@codelab/frontend-domain-page/repositories'
import { storeRepository } from '@codelab/frontend-domain-store/repositories'
import { typeRepository } from '@codelab/frontend-domain-type/repositories'

export const createAppAction = async (
  appDto: IAppDto,
  elements: Array<IElementDto>,
  stores: Array<IStoreDto>,
  storeApis: Array<IInterfaceTypeDto>,
) => {
  const { owner, pages } = appDto
  const app = await appRepository.add(appDto)

  await Promise.all(elements.map((element) => elementRepository.add(element)))
  await Promise.all(storeApis.map((api) => typeRepository.add(api, owner)))
  await Promise.all(stores.map((store) => storeRepository.add(store)))

  if (pages) {
    await Promise.all(pages.map((page) => pageRepository.add(page)))
  }

  return app
}

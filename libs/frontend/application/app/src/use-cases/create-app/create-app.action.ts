'use server'

import { appRepository } from '@codelab/frontend-domain-app/repositories'
import { elementRepository } from '@codelab/frontend-domain-element/repositories'
import { pageRepository } from '@codelab/frontend-domain-page/repositories'
import { storeRepository } from '@codelab/frontend-domain-store/repositories'
import { typeRepository } from '@codelab/frontend-domain-type/repositories'

import type { IAppAggregate } from '../../services/app.factory'

export const createAppAction = async (appAggregate: IAppAggregate) => {
  const { appsDto, elementsDto, pagesDto, storesDto, typesDto } = appAggregate

  await Promise.all(
    elementsDto.map((element) => elementRepository.add(element)),
  )
  await Promise.all(typesDto.map((type) => typeRepository.add(type)))
  await Promise.all(storesDto.map((store) => storeRepository.add(store)))
  await Promise.all(appsDto.map((appDto) => appRepository.add(appDto)))
  await Promise.all(pagesDto.map((page) => pageRepository.add(page)))

  return appsDto[0]
}

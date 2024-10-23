'use server'

import type {
  IAppDto,
  IElementDto,
  IPageDto,
} from '@codelab/shared/abstract/core'

import { appRepository } from '@codelab/frontend-domain-app/repositories'
import { elementRepository } from '@codelab/frontend-domain-element/repositories'
import { pageRepository } from '@codelab/frontend-domain-page/repositories'

export const createAppAction = async (
  appDto: IAppDto,
  pages: Array<IPageDto>,
  elements: Array<IElementDto>,
) => {
  const app = await appRepository.add(appDto)

  elements.forEach(async (element) => {
    await elementRepository.add(element)
  })

  pages.forEach(async (page) => {
    await pageRepository.add(page)
  })

  return app
}

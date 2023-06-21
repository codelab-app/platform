/* eslint-disable @nx/enforce-module-boundaries */
import { App, AppRepository } from '@codelab/backend/domain/app'
import { Element, ElementRepository } from '@codelab/backend/domain/element'
import { Page, PageRepository } from '@codelab/backend/domain/page'
import { Prop, PropRepository } from '@codelab/backend/domain/prop'
import { Store, StoreRepository } from '@codelab/backend/domain/store'
import type { InterfaceType } from '@codelab/backend/domain/type'
import { InterfaceTypeRepository } from '@codelab/backend/domain/type'
import { IPageKindName } from '@codelab/shared/abstract/core'
import {
  appData,
  internalServerErrorElementData,
  internalServerErrorPageData,
  internalServerErrorPropsData,
  notFoundElementData,
  notFoundElementPropsData,
  notFoundPageData,
  providerElementData,
  providerElementPropsData,
  providerPageData,
} from '@codelab/shared/data/test'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import type { NextApiHandler } from 'next'

const appRepository = new AppRepository()
const pageRepository = new PageRepository()
const propRepository = new PropRepository()
const elementRepository = new ElementRepository()
const storeRepository = new StoreRepository()
const interfaceTypeRepository = new InterfaceTypeRepository()

/**
 * Used as endpoint for creating Cypress data
 */
const createApp: NextApiHandler = async (req, res) => {
  try {
    const session = await auth0Instance().getSession(req, res)

    if (!session?.user) {
      return res.status(403).send('Not Authenticated')
    }

    const owner = { auth0Id: session.user.sub }
    /**
     * Create props
     */
    const providerElementProps = new Prop(providerElementPropsData)
    const notFoundElementProps = new Prop(notFoundElementPropsData)

    const internalServerErrorElementProps = new Prop(
      internalServerErrorPropsData,
    )

    await propRepository.add([
      providerElementProps,
      notFoundElementProps,
      internalServerErrorElementProps,
    ])

    /**
     * Create elements
     */

    const providerElement = new Element(providerElementData)
    const notFoundElement = new Element(notFoundElementData)

    const internalServerErrorElement = new Element(
      internalServerErrorElementData,
    )

    await elementRepository.add([
      providerElement,
      notFoundElement,
      internalServerErrorElement,
    ])

    /**
     * Create app
     */
    const app = new App(appData(owner))

    await appRepository.add([app])

    /**
     * Create pages
     */

    const providerPageStore = Store.create(owner, IPageKindName.Provider)
    const notFoundPageStore = Store.create(owner, IPageKindName.NotFound)

    const internalServerErrorPageStore = Store.create(
      owner,
      IPageKindName.InternalServerError,
    )

    await interfaceTypeRepository.add([
      providerPageStore.api as InterfaceType,
      notFoundPageStore.api as InterfaceType,
      internalServerErrorPageStore.api as InterfaceType,
    ])

    await storeRepository.add([
      providerPageStore,
      notFoundPageStore,
      internalServerErrorPageStore,
    ])

    const providerPage = new Page(
      providerPageData({ id: app.id }, providerPageStore),
    )

    const notFoundPage = new Page(
      notFoundPageData({ id: app.id }, notFoundPageStore),
    )

    const internalServerErrorPage = new Page(
      internalServerErrorPageData({ id: app.id }, internalServerErrorPageStore),
    )

    await pageRepository.add([
      providerPage,
      notFoundPage,
      internalServerErrorPage,
    ])

    /**
     * Attach the pages to the app
     */
    app.pages = [providerPage, internalServerErrorPage, notFoundPage].map(
      (page) => ({ id: page.id }),
    )

    await appRepository.update(app, { id: app.id })

    return res.send(app)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).send(err.message)
    }
  }

  return res.status(500)
}

export default createApp

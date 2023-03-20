/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { App, AppRepository } from '@codelab/backend/domain/app'
import { Element, ElementRepository } from '@codelab/backend/domain/element'
import { Page, PageRepository } from '@codelab/backend/domain/page'
import { Prop, PropRepository } from '@codelab/backend/domain/prop'
import { Store, StoreRepository } from '@codelab/backend/domain/store'
import {
  InterfaceType,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
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
  storeApiData,
  storeData,
} from '@codelab/shared/data/test'
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
    const session = await auth0Instance.getSession(req, res)

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
     * Create pages
     */
    const providerPage = new Page(providerPageData(owner))
    const notFoundPage = new Page(notFoundPageData(owner))
    const internalServerErrorPage = new Page(internalServerErrorPageData(owner))

    await pageRepository.add([
      providerPage,
      notFoundPage,
      internalServerErrorPage,
    ])

    /**
     * Create store
     */
    const storeApi = new InterfaceType(storeApiData(owner))
    await interfaceTypeRepository.add([storeApi])

    const store = new Store(storeData)
    await storeRepository.add([store])

    /**
     * Create app
     */
    const app = new App(appData(owner))
    await appRepository.add([app])

    return res.send(app)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).send(err.message)
    }
  }

  return res.status(500)
}

export default createApp

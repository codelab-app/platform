/* eslint-disable @nx/enforce-module-boundaries */
import { App, AppRepository } from '@codelab/backend/domain/app'
import { Element, ElementRepository } from '@codelab/backend/domain/element'
import { Page, PageRepository } from '@codelab/backend/domain/page'
import { Prop, PropRepository } from '@codelab/backend/domain/prop'
import { Store, StoreRepository } from '@codelab/backend/domain/store'
import type { InterfaceType } from '@codelab/backend/domain/type'
import { InterfaceTypeRepository } from '@codelab/backend/domain/type'
import type { IAuth0Owner, IAuth0User } from '@codelab/shared/abstract/core'
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
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import { v4 } from 'uuid'

export class SeedAppCommand implements IAuth0Owner {
  constructor(public owner: IAuth0User) {}
}

/**
 * Used as endpoint for creating Cypress data
 */
@CommandHandler(SeedAppCommand)
export class SeedAppHandler implements ICommandHandler<SeedAppCommand, void> {
  constructor(
    private readonly appRepository: AppRepository,
    private readonly pageRepository: PageRepository,
    private readonly propRepository: PropRepository,
    private readonly elementRepository: ElementRepository,
    private readonly storeRepository: StoreRepository,
    private readonly interfaceTypeRepository: InterfaceTypeRepository,
  ) {}

  async execute(command: SeedAppCommand) {
    const { owner } = command
    /**
     * Create props
     */
    const providerElementProps = new Prop(providerElementPropsData)
    const notFoundElementProps = new Prop(notFoundElementPropsData)

    const internalServerErrorElementProps = new Prop(
      internalServerErrorPropsData,
    )

    await this.propRepository.add([
      providerElementProps,
      notFoundElementProps,
      internalServerErrorElementProps,
    ])

    const providerPageId = v4()
    const notFoundPageId = v4()
    const internalServerPageId = v4()

    /**
     * Create elements
     */

    const providerElement = new Element(
      providerElementData({ id: providerPageId }),
    )

    const notFoundElement = new Element(
      notFoundElementData({ id: notFoundPageId }),
    )

    const internalServerErrorElement = new Element(
      internalServerErrorElementData({ id: internalServerPageId }),
    )

    await this.elementRepository.add([
      providerElement,
      notFoundElement,
      internalServerErrorElement,
    ])

    /**
     * Create app
     */
    const app = new App(appData(owner))

    await this.appRepository.add([app])

    /**
     * Create pages
     */

    const providerPageStore = Store.create(owner, IPageKindName.Provider)
    const notFoundPageStore = Store.create(owner, IPageKindName.NotFound)

    const internalServerErrorPageStore = Store.create(
      owner,
      IPageKindName.InternalServerError,
    )

    await this.interfaceTypeRepository.add([
      providerPageStore.api as InterfaceType,
      notFoundPageStore.api as InterfaceType,
      internalServerErrorPageStore.api as InterfaceType,
    ])

    await this.storeRepository.add([
      providerPageStore,
      notFoundPageStore,
      internalServerErrorPageStore,
    ])

    const providerPage = new Page(
      providerPageData(
        providerPageId,
        { id: app.id },
        providerPageStore,
        providerElement,
      ),
    )

    const notFoundPage = new Page(
      notFoundPageData(
        notFoundPageId,
        { id: app.id },
        notFoundPageStore,
        notFoundElement,
      ),
    )

    const internalServerErrorPage = new Page(
      internalServerErrorPageData(
        internalServerPageId,
        { id: app.id },
        internalServerErrorPageStore,
        internalServerErrorElement,
      ),
    )

    await this.pageRepository.add([
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

    await this.appRepository.update(app, { id: app.id })
  }
}

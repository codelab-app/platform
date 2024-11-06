import type { InterfaceType } from '@codelab/backend/domain/type'
import type { IApp, IAppDto } from '@codelab/shared/abstract/core'

import { App, AppRepository } from '@codelab/backend/domain/app'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { Element, ElementRepository } from '@codelab/backend/domain/element'
import { Page, PageRepository } from '@codelab/backend/domain/page'
import { Prop, PropRepository } from '@codelab/backend/domain/prop'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { Store, StoreRepository } from '@codelab/backend/domain/store'
import { InterfaceTypeRepository } from '@codelab/backend/domain/type'
import {
  IAtomType,
  IElementRenderTypeKind,
  IPageKindName,
} from '@codelab/shared/abstract/core'
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

export class SeedCypressAppCommand {}

/**
 * Used as endpoint for creating Cypress data
 */
@CommandHandler(SeedCypressAppCommand)
export class SeedCypressAppHandler
  implements ICommandHandler<SeedCypressAppCommand, IAppDto>
{
  constructor(
    private readonly appRepository: AppRepository,
    private readonly pageRepository: PageRepository,
    private readonly propRepository: PropRepository,
    private readonly elementRepository: ElementRepository,
    private atomRepository: AtomRepository,
    private readonly storeRepository: StoreRepository,
    private readonly interfaceTypeRepository: InterfaceTypeRepository,
    private authDomainService: AuthDomainService,
  ) {}

  async execute() {
    const owner = this.authDomainService.currentUser
    /**
     * Create props
     */
    const providerElementProps = providerElementPropsData
    const notFoundElementProps = notFoundElementPropsData
    const internalServerErrorElementProps = internalServerErrorPropsData

    await this.propRepository.addMany([
      providerElementProps,
      notFoundElementProps,
      internalServerErrorElementProps,
    ])

    const providerPageId = v4()
    const notFoundPageId = v4()
    const internalServerPageId = v4()

    const atomReactFragment = await this.atomRepository.findOneOrFail({
      where: {
        name: IAtomType.ReactFragment,
      },
    })

    /**
     * Create elements
     */
    const providerElement = new Element(
      providerElementData(
        {
          id: providerPageId,
        },
        {
          __typename: IElementRenderTypeKind.Atom,
          id: atomReactFragment.id,
        },
      ),
    )

    const notFoundElement = new Element(
      notFoundElementData(
        { id: notFoundPageId },
        {
          __typename: IElementRenderTypeKind.Atom,
          id: atomReactFragment.id,
        },
      ),
    )

    const internalServerErrorElement = new Element(
      internalServerErrorElementData(
        { id: internalServerPageId },
        {
          __typename: IElementRenderTypeKind.Atom,
          id: atomReactFragment.id,
        },
      ),
    )

    await this.elementRepository.addMany([
      providerElement,
      notFoundElement,
      internalServerErrorElement,
    ])

    /**
     * Create app
     */
    const app = appData(owner)

    await this.appRepository.add(app)

    /**
     * Create pages
     */
    const providerPageStore = Store.create(IPageKindName.Provider, owner)
    const notFoundPageStore = Store.create(IPageKindName.NotFound, owner)

    const internalServerErrorPageStore = Store.create(
      IPageKindName.InternalServerError,
      owner,
    )

    await this.interfaceTypeRepository.addMany([
      providerPageStore.api as InterfaceType,
      notFoundPageStore.api as InterfaceType,
      internalServerErrorPageStore.api as InterfaceType,
    ])

    await this.storeRepository.addMany([
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

    await this.pageRepository.addMany([
      providerPage,
      notFoundPage,
      internalServerErrorPage,
    ])

    /**
     * Attach the pages to the app
     */
    app.pages = [providerPage, internalServerErrorPage, notFoundPage].map(
      (element) => ({
        ...element,
        slug: element.slug,
      }),
    )

    await this.appRepository.update(app, { id: app.id })

    return app
  }
}

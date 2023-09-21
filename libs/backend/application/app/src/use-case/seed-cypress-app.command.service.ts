import type { Atom as IAtom } from '@codelab/backend/abstract/codegen'
import { SeedCypressAtomsCommand } from '@codelab/backend/application/atom'
import { AuthService } from '@codelab/backend/application/shared'
import { App, AppRepository } from '@codelab/backend/domain/app'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { Element, ElementRepository } from '@codelab/backend/domain/element'
import { Page, PageRepository } from '@codelab/backend/domain/page'
import { Prop, PropRepository } from '@codelab/backend/domain/prop'
import { Store, StoreRepository } from '@codelab/backend/domain/store'
import type { InterfaceType } from '@codelab/backend/domain/type'
import { InterfaceTypeRepository } from '@codelab/backend/domain/type'
import { Span } from '@codelab/backend/infra/adapter/otel'
import type { IApp } from '@codelab/shared/abstract/core'
import {
  IAtomType,
  IElementRenderTypeKind,
  IPageKindName,
  JWT_CLAIMS,
} from '@codelab/shared/abstract/core'
import {
  appData,
  createAtomsData,
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
import { CommandBus, CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import { v4 } from 'uuid'

export class SeedCypressAppCommand {}

/**
 * Used as endpoint for creating Cypress data
 */
@CommandHandler(SeedCypressAppCommand)
export class SeedCypressAppHandler
  implements ICommandHandler<SeedCypressAppCommand, IApp>
{
  constructor(
    private readonly appRepository: AppRepository,
    private readonly pageRepository: PageRepository,
    private readonly propRepository: PropRepository,
    private readonly elementRepository: ElementRepository,
    private atomRepository: AtomRepository,
    private commandBus: CommandBus,
    private readonly storeRepository: StoreRepository,
    private readonly interfaceTypeRepository: InterfaceTypeRepository,
    private authService: AuthService,
  ) {}

  @Span()
  async execute() {
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
     * Create atoms for renderType
     */
    await this.commandBus.execute<SeedCypressAtomsCommand, Array<IAtom>>(
      new SeedCypressAtomsCommand(),
    )

    const atomReactFragment = await this.atomRepository.findOne({
      name: IAtomType.ReactFragment,
    })

    if (!atomReactFragment) {
      throw new Error('Missing react fragment')
    }

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

    await this.elementRepository.add([
      providerElement,
      notFoundElement,
      internalServerErrorElement,
    ])

    /**
     * Create app
     */
    const app = new App(appData(this.authService.currentUser))

    await this.appRepository.add([app])

    /**
     * Create pages
     */
    const providerPageStore = Store.create(IPageKindName.Provider)
    const notFoundPageStore = Store.create(IPageKindName.NotFound)

    const internalServerErrorPageStore = Store.create(
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

    return app
  }
}

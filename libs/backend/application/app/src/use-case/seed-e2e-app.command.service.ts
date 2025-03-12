import type { InterfaceType } from '@codelab/backend/domain/type'
import type { IAppDto, IComponentType } from '@codelab/shared/abstract/core'

import { AtomApplicationService } from '@codelab/backend/application/atom'
import { ComponentApplicationService } from '@codelab/backend/application/component'
import { ImportSystemTypesCommand } from '@codelab/backend/application/type'
import { AppRepository } from '@codelab/backend/domain/app'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { Element, ElementRepository } from '@codelab/backend/domain/element'
import { PageRepository } from '@codelab/backend/domain/page'
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
  internalServerPageId,
  notFoundElementData,
  notFoundPageData,
  notFoundPageId,
  providerElementData,
  providerPageData,
  providerPageId,
} from '@codelab/shared/data/test'
import { Page } from '@codelab/shared-domain-module/page'
import { CommandBus, CommandHandler, type ICommandHandler } from '@nestjs/cqrs'

export class SeedE2eAppCommand {
  constructor(
    public data?: {
      atomTypes?: Array<IAtomType>
      componentTypes?: Array<IComponentType>
    },
  ) {}
}

/**
 * Used as endpoint for creating E2e data.
 *
 * We can either import data from json data or from data files
 *
 * We can either seed from code or from data files
 *
 * When seeding, we want to control what atom/component to import.
 */
@CommandHandler(SeedE2eAppCommand)
export class SeedE2eAppHandler
  implements ICommandHandler<SeedE2eAppCommand, IAppDto>
{
  constructor(
    private commandBus: CommandBus,
    private readonly appRepository: AppRepository,
    private readonly pageRepository: PageRepository,
    private readonly elementRepository: ElementRepository,
    private readonly atomRepository: AtomRepository,
    private readonly storeRepository: StoreRepository,
    private readonly interfaceTypeRepository: InterfaceTypeRepository,
    private authDomainService: AuthDomainService,
    private readonly componentApplicationService: ComponentApplicationService,
    private readonly atomApplicationService: AtomApplicationService,
  ) {}

  async execute({
    data: { atomTypes, componentTypes } = {},
  }: SeedE2eAppCommand) {
    await this.commandBus.execute<ImportSystemTypesCommand>(
      new ImportSystemTypesCommand(),
    )

    await this.atomApplicationService.addAtomsFromTypes(atomTypes)

    await this.componentApplicationService.addComponentsFromTypes(
      componentTypes,
    )

    const app = await this.seedApp()

    return app
  }

  /**
   * Logic not re-used besides this command, so we leave the logic here
   */
  private async seedApp() {
    const owner = this.authDomainService.currentUser

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
        { id: providerPageId },
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
    app.pages = [providerPage, internalServerErrorPage, notFoundPage]

    return app
  }
}

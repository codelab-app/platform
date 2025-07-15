import type {
  IPageAggregate,
  IPageCreateFormData,
} from '@codelab/shared-abstract-core'

import { ElementApplicationService } from '@codelab/backend-application-element'
import { StoreApplicationService } from '@codelab/backend-application-store'
import { AppRepository } from '@codelab/backend-domain-app'
import { ElementRepository } from '@codelab/backend-domain-element'
import { PageRepository } from '@codelab/backend-domain-page'
import { AuthDomainService } from '@codelab/backend-domain-shared-auth'
import { Store, StoreDomainService } from '@codelab/backend-domain-store'
import { InterfaceType, TypeDomainService } from '@codelab/backend-domain-type'
import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { sortElementsForExport } from '@codelab/shared-utils'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'

@Injectable()
export class PageApplicationService {
  constructor(
    private pageRepository: PageRepository,
    private elementApplicationService: ElementApplicationService,
    private storeDomainService: StoreDomainService,
    private typeDomainService: TypeDomainService,
    private elementRepository: ElementRepository,
    private appRepository: AppRepository,
    private storeApplicationService: StoreApplicationService,
    private authDomainService: AuthDomainService,
    private loggerService: PinoLoggerService,
  ) {}

  async addPage(pageAggregate: IPageAggregate) {
    const { elements, page, store } = pageAggregate
    const sortedElements = sortElementsForExport(elements)

    await this.storeApplicationService.saveStore(store)

    for (const element of sortedElements) {
      await this.elementRepository.save(element)
    }

    // after all elements are created, we need to update the parent and sibling references.
    // alternatively we can do this with a single smart run: creating elements in the order,
    // so that leaf elements are created first and then going up to the element tree root
    // UPDATE: we started to use smart sorting, so this is not needed anymore
    // for (const element of elements) {
    //   await this.elementRepository.save(element)
    // }

    await this.pageRepository.save(page)
  }

  async createPage(createPageDto: IPageCreateFormData) {
    const requestId = v4()
    const startTime = Date.now()

    this.loggerService.log('PageApplicationService.createPage started', {
      appId: createPageDto.app.id,
      pageId: createPageDto.id,
      pageName: createPageDto.name,
      requestId,
    })

    const owner = this.authDomainService.currentUser
    const appStartTime = Date.now()

    const app = await this.appRepository.findOneOrFail({
      where: { id: createPageDto.app.id },
    })

    this.loggerService.log('App lookup completed', {
      appName: app.name,
      duration: Date.now() - appStartTime,
      requestId,
    })

    const rootElementStartTime = Date.now()

    const rootElement =
      await this.elementApplicationService.createPageRootElement({
        id: createPageDto.id,
      })

    this.loggerService.log('Root element created', {
      duration: Date.now() - rootElementStartTime,
      requestId,
      rootElementId: rootElement.id,
    })

    const apiStartTime = Date.now()

    const api = await this.typeDomainService.createInterface({
      id: v4(),
      name: InterfaceType.createName(
        `${app.name}(${owner}) ${createPageDto.name} Store`,
      ),
      owner,
    })

    this.loggerService.log('API interface created', {
      apiId: api.id,
      apiName: api.name,
      duration: Date.now() - apiStartTime,
      requestId,
    })

    const storeStartTime = Date.now()

    const store = await this.storeDomainService.create({
      api,
      id: v4(),
      name: Store.createName({ name: createPageDto.name }),
    })

    this.loggerService.log('Store created', {
      duration: Date.now() - storeStartTime,
      requestId,
      storeId: store.id,
      storeName: store.name,
    })

    const pageStartTime = Date.now()

    const page = await this.pageRepository.add({
      ...createPageDto,
      rootElement,
      store,
    })

    this.loggerService.log('Page created', {
      duration: Date.now() - pageStartTime,
      pageId: page.id,
      requestId,
    })

    this.loggerService.log('PageApplicationService.createPage completed', {
      requestId,
      totalDuration: Date.now() - startTime,
    })

    return page
  }
}

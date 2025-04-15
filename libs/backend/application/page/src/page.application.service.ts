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

    await this.storeApplicationService.addStores([store])

    for (const element of elements) {
      await this.elementRepository.save(element)
    }

    // after all elements are created, we need to update the parent and sibling references.
    // alternatively we can do this with a single smart run: creating elements in the order,
    // so that leaf elements are created first and then going up to the element tree root
    for (const element of elements) {
      await this.elementRepository.save(element)
    }

    await this.pageRepository.save(page)
  }

  async createPage(createPageDto: IPageCreateFormData) {
    const owner = this.authDomainService.currentUser

    const app = await this.appRepository.findOneOrFail({
      where: { id: createPageDto.app.id },
    })

    const rootElement =
      await this.elementApplicationService.createPageRootElement({
        id: createPageDto.id,
      })

    const api = await this.typeDomainService.createInterface({
      id: v4(),
      name: InterfaceType.createName(
        `${app.name}(${owner}) ${createPageDto.name} Store`,
      ),
      owner,
    })

    const store = await this.storeDomainService.create({
      api,
      id: v4(),
      name: Store.createName({ name: createPageDto.name }),
    })

    this.loggerService.debug('Create page ')

    return this.pageRepository.add({
      ...createPageDto,
      rootElement,
      store,
    })
  }
}

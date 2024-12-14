import type { IPageCreateFormData } from '@codelab/shared/abstract/core'

import { ElementApplicationService } from '@codelab/backend/application/element'
import { AppRepository } from '@codelab/backend/domain/app'
import { PageRepository } from '@codelab/backend/domain/page'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { Store, StoreDomainService } from '@codelab/backend/domain/store'
import { InterfaceType, TypeDomainService } from '@codelab/backend/domain/type'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'

@Injectable()
export class PageApplicationService {
  constructor(
    private pageRepository: PageRepository,
    private elementApplicationService: ElementApplicationService,
    private storeDomainService: StoreDomainService,
    private typeDomainService: TypeDomainService,
    private appRepository: AppRepository,
    private authDomainService: AuthDomainService,
  ) {}

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

    return this.pageRepository.add({
      ...createPageDto,
      rootElement,
      store,
    })
  }
}

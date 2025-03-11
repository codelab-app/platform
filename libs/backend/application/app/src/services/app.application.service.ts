import { ComponentApplicationService } from '@codelab/backend/application/component'
import { PageApplicationService } from '@codelab/backend/application/page'
import { AppRepository } from '@codelab/backend/domain/app'
import { DomainRepository } from '@codelab/backend/domain/domain'
import { PropRepository } from '@codelab/backend/domain/prop'
import { ResourceRepository } from '@codelab/backend/domain/resource'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { IAppAggregate } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppApplicationService {
  constructor(
    private readonly appRepository: AppRepository,
    private readonly resourceRepository: ResourceRepository,
    private readonly propRepository: PropRepository,
    private readonly domainRepository: DomainRepository,
    private readonly componentApplicationService: ComponentApplicationService,
    private pageApplicationService: PageApplicationService,
    private authDomainService: AuthDomainService,
  ) {}

  async importApp(appAggregate: IAppAggregate) {
    const { app, components, domains, pages, resources } = appAggregate

    for (const resource of resources) {
      await this.propRepository.save(resource.config)
      await this.resourceRepository.save({
        ...resource,
        owner: this.authDomainService.currentUser,
      })
    }

    await this.componentApplicationService.addComponents(components)

    for (const domain of domains) {
      // await this.digitaloceanService.createDomain(domain.name)
      await this.domainRepository.save(domain)
    }

    await this.appRepository.save({
      ...app,
      owner: this.authDomainService.currentUser,
    })

    for (const page of pages) {
      await this.pageApplicationService.addPage(page)
    }

    return app
  }
}

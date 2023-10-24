import { type IRedirectDTO, IRedirectKind } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { PageRedirect } from '../model/page-redirect.model'
import { UrlRedirect } from '../model/url-redirect.model'
import { PageRedirectRepository } from './page-redirect.repo.service'
import { UrlRedirectRepository } from './url-redirect.repo.service'

@Injectable()
export class RedirectFactory {
  constructor(
    private readonly pageRedirectRepository: PageRedirectRepository,
    private readonly urlRedirectRepository: UrlRedirectRepository,
  ) {}

  async save(redirect: IRedirectDTO) {
    switch (redirect.__typename) {
      case IRedirectKind.PageRedirect: {
        const pageRedirect = new PageRedirect(redirect)

        return await this.pageRedirectRepository.save(pageRedirect)
      }

      case IRedirectKind.UrlRedirect: {
        const urlRedirect = new UrlRedirect(redirect)

        return await this.urlRedirectRepository.save(urlRedirect)
      }

      default: {
        throw new Error('No RedirectFactory found')
      }
    }
  }
}

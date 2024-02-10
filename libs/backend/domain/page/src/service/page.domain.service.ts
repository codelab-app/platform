import type { IAppDTO, ICreatePageData } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { PageRepository } from '../repository'

@Injectable()
export class PageDomainService {
  constructor(private pageRepository: PageRepository) {}

  private create(
    app: Pick<IAppDTO, 'name'>,
    { id, kind, name, url }: ICreatePageData,
  ) {
    //
  }
}

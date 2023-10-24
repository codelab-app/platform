import type { IPageRedirectDTO } from '@codelab/shared/abstract/core'
import { IRedirectKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export class PageRedirect implements IPageRedirectDTO {
  __typename: `${IRedirectKind.PageRedirect}` = `${IRedirectKind.PageRedirect}`

  page: IEntity

  id: string

  constructor({ id, page }: IPageRedirectDTO) {
    this.id = id
    this.page = page
  }
}

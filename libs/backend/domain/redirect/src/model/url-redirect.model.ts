import type { IUrlRedirectDTO } from '@codelab/shared/abstract/core'
import { IRedirectKind } from '@codelab/shared/abstract/core'

export class UrlRedirect implements IUrlRedirectDTO {
  __typename: `${IRedirectKind.UrlRedirect}` = `${IRedirectKind.UrlRedirect}`

  url: string

  id: string

  constructor({ id, url }: IUrlRedirectDTO) {
    this.id = id
    this.url = url
  }
}

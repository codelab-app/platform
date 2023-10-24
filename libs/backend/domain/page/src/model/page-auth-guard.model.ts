import type {
  IPageAuthGuardDTO,
  IRedirectDTO,
} from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export class PageAuthGuard implements IPageAuthGuardDTO {
  authGuard: IEntity

  id: string

  redirect: IRedirectDTO

  constructor({ authGuard, id, redirect }: IPageAuthGuardDTO) {
    this.id = id
    this.authGuard = authGuard
    this.redirect = redirect
  }
}

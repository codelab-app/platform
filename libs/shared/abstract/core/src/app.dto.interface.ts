import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IDomain, IDomainDTO } from './domain.dto.interface'
import { IPage, IPageDTO } from './page.dto.interface'
import { IOwner } from './user.interface'

export const IAppDTO = Type.Composite([
  /**
   * Owner required for composite key
   */
  IOwner,
  Type.Object({
    domains: Type.Optional(Type.Array(IDomainDTO)),
    id: Type.String(),
    name: Type.String(),
    pages: Type.Optional(Type.Array(IPageDTO)),
  }),
])

export type IAppDTO = Static<typeof IAppDTO>

export const IApp = Typebox.Overwrite(
  IAppDTO,
  Type.Object({
    domains: Type.Array(IDomain),
    pages: Type.Array(IPage),
  }),
)

export type IApp = Static<typeof IApp>

import { Typebox } from '@codelab/shared/abstract/typebox'
import { IEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IDomain, IDomainDto } from '../domain/domain.dto.interface'
import { IPage, IPageDto } from '../page'
import { IOwner } from '../user'

export const IAppDto = Type.Composite([
  IEntity,
  /**
   * Owner required for composite key
   */
  IOwner,
  Type.Object({
    domains: Type.Optional(Type.Array(IDomainDto)),
    // id: Type.String(),
    name: Type.String(),
    pages: Type.Optional(Type.Array(IPageDto)),
  }),
])

export type IAppDto = Static<typeof IAppDto>

export const IApp = Typebox.Overwrite(
  IAppDto,
  Type.Object({
    domains: Type.Array(IDomain),
    pages: Type.Array(IPage),
  }),
)

export type IApp = Static<typeof IApp>

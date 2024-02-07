import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IComponentExport } from './component.dto.interface'
import { IDomain, IDomainDTO } from './domain.dto.interface'
import { IPage, IPageDTO, IPageExport } from './page.dto.interface'
import { IResource } from './resource.dto.interface'
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

export const IAppExport = Typebox.Overwrite(
  IApp,
  Type.Object({
    components: Type.Optional(Type.Array(IComponentExport)),
    pages: Type.Array(IPageExport),
    resources: Type.Optional(Type.Array(IResource)),
  }),
)

export type IAppExport = Static<typeof IAppExport>

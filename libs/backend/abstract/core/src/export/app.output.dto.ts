import { IAppDTO } from '@codelab/shared/abstract/core'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IComponentOutputDto } from './component.output.dto'
import { IDomainOutputDto } from './domain.output.dto'
import { IPageOutputDto } from './page.output.dto'

export const IAppOutputDto = Type.Object({
  app: Type.Omit(IAppDTO, ['owner']),
  components: Type.Array(IComponentOutputDto),
  domains: Type.Array(IDomainOutputDto),
  pages: Type.Array(IPageOutputDto),
})

export type IAppOutputDto = Static<typeof IAppOutputDto>

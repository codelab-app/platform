import type { PageWhere } from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IRepository } from '../../service'
import type { IPage } from './page.model.interface'

export type IPageRepository = IRepository<IPage, IEntity, PageWhere>

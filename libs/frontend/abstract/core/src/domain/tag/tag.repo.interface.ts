import type { TagWhere } from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IRepository } from '../../service'
import type { ITag } from './tag.model.interface'

export type ITagRepository = IRepository<ITag, IEntity, TagWhere>

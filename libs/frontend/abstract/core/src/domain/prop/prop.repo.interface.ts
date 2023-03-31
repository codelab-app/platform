import type { PropWhere } from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IRepository } from '../../service'
import type { IProp } from './prop.model.interface'

export type IPropRepository = IRepository<IProp, IEntity, PropWhere>

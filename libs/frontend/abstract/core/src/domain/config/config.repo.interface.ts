import type { ConfigWhere } from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IRepository } from '../../service'
import type { IConfig } from './config.model.interface'

export type IConfigRepository = IRepository<IConfig, IEntity, ConfigWhere>

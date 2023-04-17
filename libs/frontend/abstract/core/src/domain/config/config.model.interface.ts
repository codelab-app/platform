import type {
  ConfigCreateInput,
  ConfigDeleteInput,
  ConfigUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { ICacheService } from '../../service'
import type { IModel } from '../model.interface'
import type { IConfigDTO } from './config.dto.interface'

export interface IConfig
  extends ICacheService<IConfigDTO, IConfig>,
    IModel<ConfigCreateInput, ConfigUpdateInput, ConfigDeleteInput> {
  app: IEntity
  id: string
  name: string
}

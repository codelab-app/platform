import type {
  ConfigOptions,
  ConfigWhere,
} from '@codelab/shared/abstract/codegen'
import type { ICRUDService, IQueryService } from '../../service'
import type { ICreateConfigData } from './config.dto.interface'
import type { IConfig } from './config.model.interface'

export interface IConfigService
  extends ICRUDService<IConfig, ICreateConfigData, ICreateConfigData>,
    Omit<
      IQueryService<IConfig, ConfigWhere, ConfigOptions>,
      'getAll' | 'getOne'
    > {
  configs: Array<IConfig>
  configsList: Array<IConfig>
  getAll(where?: ConfigWhere): Promise<Array<IConfig>>
}

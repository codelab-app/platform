import type {
  UrlCreateInput,
  UrlUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IUrlDTO } from '@codelab/shared/abstract/core'
import type { ICacheService } from '../../service'
import type { IModel } from '../model.interface'

export interface IUrlModel
  extends IModel<UrlCreateInput, UrlUpdateInput, void>,
    ICacheService<IUrlDTO, IUrlModel> {
  id: string
  url: string
}

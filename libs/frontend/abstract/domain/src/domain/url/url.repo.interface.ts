import type {
  UrlFragment,
  UrlOptions,
  UrlWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { IUrlModel } from './url.model.interface'

export type IUrlRepository = IRepository<
  IUrlModel,
  UrlFragment,
  UrlWhere,
  UrlOptions
>

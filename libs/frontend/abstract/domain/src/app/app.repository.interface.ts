import type { IAppDto } from '@codelab/shared-abstract-core'
import type {
  AppFragment,
  AppOptions,
  AppPreviewFragment,
  AppWhere,
} from '@codelab/shared-infra-gqlgen'

import type { IFindResults, IRepository } from '../shared'

export type IAppRepository = IRepository<
  IAppDto,
  AppFragment,
  AppWhere,
  AppOptions
> & {
  findPreview(
    where: AppWhere,
    options?: AppOptions,
  ): Promise<IFindResults<AppPreviewFragment>>
}

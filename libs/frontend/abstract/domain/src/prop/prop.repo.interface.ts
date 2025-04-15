import type { IPropDto } from '@codelab/shared-abstract-core'
import type {
  PropFragment,
  PropOptions,
  PropWhere,
} from '@codelab/shared-infra-gqlgen'

import type { IRepository } from '../shared'

export type IPropRepository = IRepository<
  IPropDto,
  PropFragment,
  PropWhere,
  PropOptions
>

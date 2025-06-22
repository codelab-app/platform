import type { IAtomDto } from '@codelab/shared-abstract-core'
import type {
  AtomFragment,
  AtomOptions,
  AtomWhere,
} from '@codelab/shared-infra-gqlgen'

import type { IRepository } from '../shared'

export type IAtomRepository = IRepository<
  IAtomDto,
  AtomFragment,
  AtomWhere,
  AtomOptions
>

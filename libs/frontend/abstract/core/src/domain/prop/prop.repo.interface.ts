import type { PropWhere } from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { PropFragment } from './prop.fragment.graphql.gen'
import type { IProp } from './prop.model.interface'

export type IPropRepository = IRepository<IProp, PropFragment, PropWhere>

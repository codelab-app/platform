import type { IElementDto } from '@codelab/shared-abstract-core'

import type { IHydrateable } from '../shared'
import type { ILambdaModel } from './lambda.model.interface'

export type IElementDomainService = IHydrateable<IElementDto, ILambdaModel>

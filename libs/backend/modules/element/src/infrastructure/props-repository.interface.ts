import { IBaseRepository } from '@codelab/backend/abstract/core'
import { IProps } from '@codelab/shared/abstract/core'

export type IPropsRepository = IBaseRepository<IProps>

export const IPropsRepositoryToken = Symbol('PropsRepository')

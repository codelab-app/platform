import type { IRedirectDTO } from '@codelab/shared/abstract/core'

export type ICreateRedirectData = Omit<IRedirectDTO, '__typename'>

export type ICreateUpdateData = ICreateRedirectData

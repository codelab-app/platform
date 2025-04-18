import { type IAppDto } from '@codelab/shared-abstract-core'

export type IAppCreateFormData = Pick<IAppDto, 'id' | 'name'>
export type IAppUpdateFormData = Pick<IAppDto, 'id' | 'name'>

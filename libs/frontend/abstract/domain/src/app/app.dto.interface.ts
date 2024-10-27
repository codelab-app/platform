import {
  AppDtoSchema,
  type IApp,
  type IAppDto,
} from '@codelab/shared/abstract/core'
import { Typebox } from '@codelab/shared/abstract/typebox'
import { type Static, Type } from '@sinclair/typebox'

export type IAppCreateFormData = Pick<IAppDto, 'id' | 'name'>
export type IAppUpdateFormData = Pick<IAppDto, 'id' | 'name'>

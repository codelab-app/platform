import {
  AppDtoSchema,
  type IApp,
  type IAppDto,
  PageCreateDtoSchema,
} from '@codelab/shared/abstract/core'
import { Typebox } from '@codelab/shared/abstract/typebox'
import { type Static, Type } from '@sinclair/typebox'

export type IAppCreateFormData = Pick<IAppDto, 'id' | 'name'>
export type IAppUpdateFormData = Pick<IAppDto, 'id' | 'name'>

const AppCreateDtoSchema = Typebox.Overwrite(
  AppDtoSchema,
  Type.Object({
    pages: Type.Array(PageCreateDtoSchema),
  }),
)

export type IAppCreateDto = Static<typeof AppCreateDtoSchema>

export type IAppUpdateDto = IAppUpdateFormData

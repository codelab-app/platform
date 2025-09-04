import type {
  SchemaBuilder,
  SelectOption,
} from '@codelab/frontend-abstract-types'
import type {
  IAuthGuardDto,
  IResourceFetchConfig,
} from '@codelab/shared-abstract-core'

export type IAuthGuardCreateFormData = Omit<IAuthGuardDto, 'config'> & {
  config: {
    id: string
    data: IResourceFetchConfig
  }
}

export type IAuthGuardUpdateFormData = Omit<IAuthGuardCreateFormData, 'owner'>

export type ICreateAuthGuardSchemaBuilder = SchemaBuilder<
  { resources: Array<SelectOption> },
  IAuthGuardCreateFormData
>

export type IUpdateAuthGuardSchemaBuilder = SchemaBuilder<
  { resources: Array<SelectOption> },
  IAuthGuardUpdateFormData
>

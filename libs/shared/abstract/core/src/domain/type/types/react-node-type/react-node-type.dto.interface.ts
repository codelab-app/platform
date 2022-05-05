import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { ReactNodeTypeFragment } from '../../fragments'
import { IBaseTypeExportFields } from '../base-type'

export type IReactNodeTypeDTO = ReactNodeTypeFragment

export type IReactNodeTypeExport = Pick<
  OGM_TYPES.ReactNodeType,
  IBaseTypeExportFields
> &
  Required<Pick<OGM_TYPES.ReactNodeType, '__typename'>>

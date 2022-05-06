import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { RenderPropsTypeFragment } from '../../fragments'
import { IBaseTypeExportFields } from '../base-type'

export type IRenderPropsTypeDTO = RenderPropsTypeFragment

export type IRenderPropsTypeExport = Pick<
  OGM_TYPES.RenderPropsType,
  IBaseTypeExportFields
> &
  Required<Pick<OGM_TYPES.RenderPropsType, '__typename'>>

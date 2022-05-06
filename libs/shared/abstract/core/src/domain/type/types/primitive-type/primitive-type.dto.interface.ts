import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { PrimitiveTypeFragment } from '../../fragments'
import { IBaseTypeExportFields } from '../base-type'

export type IPrimitiveTypeDTO = PrimitiveTypeFragment

export type IPrimitiveTypeExport = Pick<
  OGM_TYPES.PrimitiveType,
  IBaseTypeExportFields | 'primitiveKind'
> &
  Required<Pick<OGM_TYPES.PrimitiveType, '__typename'>>

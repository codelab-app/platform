import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { EnumTypeFragment, EnumTypeValueFragment } from '../../fragments'
import { IBaseTypeExportFields } from '../base-type'

export type IEnumTypeDTO = EnumTypeFragment

export type IEnumTypeValueDTO = EnumTypeValueFragment

export type IEnumTypeExport = Pick<
  OGM_TYPES.EnumType,
  IBaseTypeExportFields | 'allowedValues'
> &
  Required<Pick<OGM_TYPES.EnumType, '__typename'>>

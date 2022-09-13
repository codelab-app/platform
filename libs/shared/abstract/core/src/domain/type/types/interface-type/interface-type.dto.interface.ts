import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { InterfaceTypeFragment } from '../../fragments'
import { IBaseTypeExportFields } from '../base-type'

export type IInterfaceTypeDTO = InterfaceTypeFragment

export type IInterfaceTypeExport = Pick<
  OGM_TYPES.InterfaceType,
  IBaseTypeExportFields | 'fields' | 'fieldsConnection' | 'ownerConnection'
> &
  Required<Pick<OGM_TYPES.InterfaceType, '__typename'>>

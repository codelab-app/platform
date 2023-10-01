import type { IAtomDTO, IInterfaceTypeDTO } from '@codelab/shared/abstract/core'
import { IAtomType, ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

/**
 * Types we wan't to seed
 */
export const atomTypes = [
  IAtomType.AntDesignButton,
  IAtomType.AntDesignTypographyText,
  IAtomType.AntDesignGridCol,
  IAtomType.AntDesignGridRow,
  IAtomType.AntDesignSpace,
  IAtomType.AntDesignCard,
  IAtomType.AntDesignCheckbox,
  IAtomType.AntDesignForm,
  IAtomType.AntDesignFormItem,
  IAtomType.AntDesignInput,
  IAtomType.AntDesignRadio,
  IAtomType.AntDesignRadioGroup,
  IAtomType.AntDesignSelect,
  IAtomType.NextLink,
  IAtomType.ReactFragment,
]

import type { IAtomDTO, IInterfaceTypeDTO } from '@codelab/shared/abstract/core'
import { IAtomType, ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

const atomTypes = [
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
]

export const createAtomsData = (): Array<IAtomDTO> =>
  atomTypes.map((atomType) => ({
    api: {
      id: v4(),
    },
    id: v4(),
    name: atomType,
    requiredParents: [],
    suggestedChildren: [],
    tags: [],
    type: atomType,
  }))

export const createAtomsApiData = (
  atomsData: Array<IAtomDTO>,
): Array<IInterfaceTypeDTO> =>
  atomsData.map((atom) => {
    if (!atom.api.id) {
      throw new Error('Missing api id')
    }

    return {
      fields: [],
      id: atom.api.id,
      kind: ITypeKind.InterfaceType,
      name: `${atom.name} API`,
    }
  })

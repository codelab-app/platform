import type {
  IAtomDTO,
  IAuth0Owner,
  IInterfaceTypeDTO,
} from '@codelab/shared/abstract/core'
import { IAtomType, ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

const atomTypes = [
  IAtomType.AntDesignButton,
  IAtomType.AntDesignTypographyText,
  IAtomType.AntDesignGridCol,
  IAtomType.AntDesignGridRow,
  IAtomType.AntDesignSpace,
  IAtomType.AntDesignCard,
  IAtomType.AntDesignInput,
]

export const createAtomsData = (owner: IAuth0Owner): Array<IAtomDTO> =>
  atomTypes.map((atomType) => ({
    api: {
      id: v4(),
    },
    id: v4(),
    name: atomType,
    owner,
    requiredParents: [],
    suggestedChildren: [],
    tags: [],
    type: atomType,
  }))

export const createAtomsApiData = (
  atomsData: Array<IAtomDTO>,
): Array<IInterfaceTypeDTO> =>
  atomsData.map((atom) => ({
    fields: [],
    id: atom.api.id,
    kind: ITypeKind.InterfaceType,
    name: `${atom.name} API`,
    owner: atom.owner,
  }))

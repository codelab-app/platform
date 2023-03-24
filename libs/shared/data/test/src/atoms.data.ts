import type { IAtomDTO, IAuth0Owner } from '@codelab/frontend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
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
    allowedChildren: [],
    api: {
      id: v4(),
    },
    id: v4(),
    name: atomType,
    owner,
    tags: [],
    type: atomType,
  }))

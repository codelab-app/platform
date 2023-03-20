import type { IAtomDTO, IAuth0Owner } from '@codelab/frontend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { getApiName } from '@codelab/shared/domain/mapper'
import { v4 } from 'uuid'

export const createAtomsData = (owner: IAuth0Owner): Array<IAtomDTO> => [
  {
    allowedChildren: [],
    api: {
      id: v4(),
      // name: getApiName(IAtomType.AntDesignButton),
    },
    id: v4(),
    name: IAtomType.AntDesignButton,
    owner,
    tags: [],
    type: IAtomType.AntDesignButton,
  },
  {
    allowedChildren: [],
    api: {
      id: v4(),
      // name: getApiName(IAtomType.AntDesignTypographyText),
    },
    id: v4(),
    name: IAtomType.AntDesignTypographyText,
    owner,
    tags: [],
    type: IAtomType.AntDesignTypographyText,
  },
  {
    allowedChildren: [],
    api: {
      id: v4(),
      // name: getApiName(IAtomType.AntDesignGridCol),
    },
    id: v4(),
    name: IAtomType.AntDesignGridCol,
    owner,
    tags: [],
    type: IAtomType.AntDesignGridCol,
  },
  {
    allowedChildren: [],
    api: {
      id: v4(),
      // name: getApiName(IAtomType.AntDesignGridRow),
    },
    id: v4(),
    name: IAtomType.AntDesignGridRow,
    owner,
    tags: [],
    type: IAtomType.AntDesignGridRow,
  },
]

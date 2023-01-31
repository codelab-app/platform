import type { IAtomExport } from '@codelab/backend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { getApiName } from '@codelab/shared/domain/mapper'
import { v4 } from 'uuid'

type CreateAtoms = (
  atomIds?: [string, string],
  interfaceIds?: [string, string],
) => Array<IAtomExport>

export const createAtomsData: CreateAtoms = (
  [buttonId, textId] = [v4(), v4()],
  [buttonInterfaceId, textInterfaceId] = [v4(), v4()],
) => [
  {
    id: buttonId,
    name: IAtomType.AntDesignButton,
    type: IAtomType.AntDesignButton,
    api: {
      id: buttonInterfaceId,
      name: getApiName(IAtomType.AntDesignButton),
    },
    tags: [],
    allowedChildren: [],
  },
  {
    id: textId,
    name: IAtomType.AntDesignTypographyText,
    type: IAtomType.AntDesignTypographyText,
    api: {
      id: textInterfaceId,
      name: getApiName(IAtomType.AntDesignTypographyText),
    },
    tags: [],
    allowedChildren: [],
  },
  {
    id: v4(),
    name: IAtomType.AntDesignGridCol,
    type: IAtomType.AntDesignGridCol,
    api: {
      id: v4(),
      name: getApiName(IAtomType.AntDesignGridCol),
    },
    tags: [],
    allowedChildren: [],
  },
  {
    id: v4(),
    name: IAtomType.AntDesignGridRow,
    type: IAtomType.AntDesignGridRow,
    api: {
      id: v4(),
      name: getApiName(IAtomType.AntDesignGridRow),
    },
    tags: [],
    allowedChildren: [],
  },
]

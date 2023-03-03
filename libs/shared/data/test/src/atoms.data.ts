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
    allowedChildren: [],
    api: {
      id: buttonInterfaceId,
      name: getApiName(IAtomType.AntDesignButton),
    },
    id: buttonId,
    name: IAtomType.AntDesignButton,
    tags: [],
    type: IAtomType.AntDesignButton,
  },
  {
    allowedChildren: [],
    api: {
      id: textInterfaceId,
      name: getApiName(IAtomType.AntDesignTypographyText),
    },
    id: textId,
    name: IAtomType.AntDesignTypographyText,
    tags: [],
    type: IAtomType.AntDesignTypographyText,
  },
  {
    allowedChildren: [],
    api: {
      id: v4(),
      name: getApiName(IAtomType.AntDesignGridCol),
    },
    id: v4(),
    name: IAtomType.AntDesignGridCol,
    tags: [],
    type: IAtomType.AntDesignGridCol,
  },
  {
    allowedChildren: [],
    api: {
      id: v4(),
      name: getApiName(IAtomType.AntDesignGridRow),
    },
    id: v4(),
    name: IAtomType.AntDesignGridRow,
    tags: [],
    type: IAtomType.AntDesignGridRow,
  },
]

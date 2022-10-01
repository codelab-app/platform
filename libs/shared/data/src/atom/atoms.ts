import { IAtomExport } from '@codelab/backend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const getApiName = (name: string) => {
  return `${name} API`
}

type CreateAtoms = (
  atomIds?: Array<string>,
  interfaceIds?: Array<string>,
) => Array<IAtomExport>

export const createAtomsData: CreateAtoms = (
  [buttonId, textId] = [],
  [buttonInterfaceId, textInterfaceId] = [],
) => [
  {
    id: buttonId ?? v4(),
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
    id: textId ?? v4(),
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

export const connectTypeId = (id?: string) => {
  return {
    connect: id
      ? {
          where: { node: { id } },
          edge: { data: '{}' },
        }
      : undefined,
  }
}

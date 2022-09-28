import { IAtomExport, IAtomType } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

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

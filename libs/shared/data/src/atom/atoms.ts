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
  },
  {
    id: textId ?? v4(),
    name: IAtomType.AntDesignTypographyText,
    type: IAtomType.AntDesignTypographyText,
    api: {
      id: textInterfaceId,
    },
  },
  {
    id: v4(),
    name: IAtomType.AntDesignGridCol,
    type: IAtomType.AntDesignGridCol,
    api: {
      id: undefined,
    },
  },
  {
    id: v4(),
    name: IAtomType.AntDesignGridRow,
    type: IAtomType.AntDesignGridRow,
    api: {
      id: undefined,
    },
  },
]

export const connectOwner = (auth0Id: string) => {
  return { connect: { where: { node: { auth0Id: auth0Id } } } }
}

export const connectId = (id?: string) => {
  return { connect: id ? { where: { node: { id } } } : undefined }
}

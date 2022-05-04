import { IAtomType, ICreateAtomDTO } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

type CreateAtoms = (
  atomIds?: Array<string>,
  interfaceIds?: Array<string>,
) => Array<Omit<ICreateAtomDTO, 'owner'>>

export const createAtomsData: CreateAtoms = (
  [buttonId, textId] = [],
  [buttonInterfaceId, textInterfaceId] = [],
) => [
  {
    id: buttonId ?? v4(),
    name: IAtomType.AntDesignButton,
    type: IAtomType.AntDesignButton,
    interfaceId: buttonInterfaceId,
  },
  {
    id: textId ?? v4(),
    name: IAtomType.AntDesignTypographyText,
    type: IAtomType.AntDesignTypographyText,
    interfaceId: textInterfaceId,
  },
  { name: IAtomType.AntDesignGridCol, type: IAtomType.AntDesignGridCol },
  { name: IAtomType.AntDesignGridRow, type: IAtomType.AntDesignGridRow },
]

export const connectOwner = (auth0Id: string) => {
  return { connect: { where: { node: { auth0Id: auth0Id } } } }
}

export const connectId = (id?: string) => {
  return { connect: { where: { node: { id } } } }
}

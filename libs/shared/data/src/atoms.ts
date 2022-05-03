import { IAtomType, ICreateAtomDTO } from '@codelab/shared/abstract/core'

type CreateAtoms = (ids: Array<string>) => Array<Omit<ICreateAtomDTO, 'owner'>>

export const createAtomsData: CreateAtoms = ([
  buttonInterfaceId,
  typeInterfaceId,
]) => [
  // { name: IAtomType.AntDesignGridCol, type: IAtomType.AntDesignGridCol },
  // { name: IAtomType.AntDesignGridRow, type: IAtomType.AntDesignGridRow },
  {
    name: IAtomType.AntDesignButton,
    type: IAtomType.AntDesignButton,
    interfaceId: buttonInterfaceId,
  },
  {
    name: IAtomType.AntDesignTypographyText,
    type: IAtomType.AntDesignTypographyText,
    interfaceId: typeInterfaceId,
  },
]

export const connectOwner = (auth0Id: string) => {
  return { connect: { where: { node: { auth0Id: auth0Id } } } }
}

export const connectId = (id?: string) => {
  return { connect: { where: { node: { id } } } }
}

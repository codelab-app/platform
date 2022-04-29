import { IAtomType, ICreateAtomDTO } from '@codelab/shared/abstract/core'

export const createAtomsData: Array<Omit<ICreateAtomDTO, 'owner'>> = [
  { name: IAtomType.AntDesignGridCol, type: IAtomType.AntDesignGridCol },
  { name: IAtomType.AntDesignGridRow, type: IAtomType.AntDesignGridRow },
  { name: IAtomType.AntDesignButton, type: IAtomType.AntDesignButton },
  {
    name: IAtomType.AntDesignTypographyText,
    type: IAtomType.AntDesignTypographyText,
  },
]

export const connectOwner = (auth0Id: string) => {
  return { connect: { where: { node: { auth0Id: auth0Id } } } }
}

export const connectId = (id?: string) => {
  return { connect: { where: { node: { id } } } }
}

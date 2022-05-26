import { IAtomExport, IAtomType } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const appName = 'MyApp'
export const pageName = 'myPage'
export const buttonName = 'Button'
export const backgroundColor1 = 'rgb(48, 182, 99)'
export const backgroundColor2 = 'rgb(182, 99, 48)'

export const buttonAtom: IAtomExport = {
  id: v4(),
  name: IAtomType.AntDesignButton,
  type: IAtomType.AntDesignButton,
  api: {
    id: undefined,
  },
}

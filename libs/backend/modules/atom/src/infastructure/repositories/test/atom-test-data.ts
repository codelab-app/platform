import {
  AtomType,
  IAtom,
  IInterfaceType,
  TypeKind,
} from '@codelab/shared/abstract/core'

export const testAtom: Omit<IAtom, 'api'> = {
  id: '',
  type: AtomType.AntDesignAffix,
  name: 'Test Atom',
}

export const atomUpdateData = {
  type: AtomType.AntDesignAvatar,
  name: 'Updated atom',
}

export const testApi: IInterfaceType = {
  id: '',
  name: 'Test API',
  fields: [],
  owner: null,
  typeKind: TypeKind.InterfaceType,
}

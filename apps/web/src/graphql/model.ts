import { getOgm } from './infra/ogm'
import { AtomModel, InterfaceTypeModel, UserModel } from './ogm-types.gen'

let userInst: UserModel

export const User = () => (userInst ??= getOgm().model('User'))

let atomInst: AtomModel

export const Atom = () => (atomInst ??= getOgm().model('Atom'))

let interfaceInst: InterfaceTypeModel

export const InterfaceType = () =>
  (interfaceInst ??= getOgm().model('InterfaceType'))

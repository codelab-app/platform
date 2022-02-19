import { getOgm } from './infra/ogm'
import {
  AtomModel,
  ElementModel,
  InterfaceTypeModel,
  PageModel,
  UserModel,
} from './ogm-types.gen'

let userInst: UserModel

export const User = () => (userInst ??= getOgm().model('User'))

let atomInst: AtomModel

export const Atom = () => (atomInst ??= getOgm().model('Atom'))

let elementInst: ElementModel

export const Element = () => (elementInst ??= getOgm().model('Element'))

let pageInst: PageModel

export const Page = () => (pageInst ??= getOgm().model('Page'))

let interfaceInst: InterfaceTypeModel

export const InterfaceType = () =>
  (interfaceInst ??= getOgm().model('InterfaceType'))

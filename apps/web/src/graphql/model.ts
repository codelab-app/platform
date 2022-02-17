import { getOgm } from './infra/ogm'
import {
  AtomModel,
  ElementModel,
  InterfaceTypeModel,
<<<<<<< HEAD
  PageModel,
=======
>>>>>>> 554af699 (feat: use reslovers for elements graph)
  UserModel,
} from './ogm-types.gen'

let userInst: UserModel

export const User = () => (userInst ??= getOgm().model('User'))

let atomInst: AtomModel

export const Atom = () => (atomInst ??= getOgm().model('Atom'))

let elementInst: ElementModel

export const Element = () => (elementInst ??= getOgm().model('Element'))

<<<<<<< HEAD
let pageInst: PageModel

export const Page = () => (pageInst ??= getOgm().model('Page'))

=======
>>>>>>> 554af699 (feat: use reslovers for elements graph)
let interfaceInst: InterfaceTypeModel

export const InterfaceType = () =>
  (interfaceInst ??= getOgm().model('InterfaceType'))

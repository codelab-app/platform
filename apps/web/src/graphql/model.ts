import { getOgm } from './infra/ogm'
import {
  AtomModel,
  ComponentModel,
  ElementModel,
  PageModel,
  UserModel, 
  TagModel, 
  InterfaceTypeModel, 
  PrimitiveTypeModel, 
  UnionTypeModel, ArrayTypeModel, 
  EnumTypeModel, 
  LambdaTypeModel, 
  AppTypeModel, 
  RenderPropsTypeModel, 
  ReactNodeTypeModel, 
  PageTypeModel, 
  MonacoTypeModel, 
  ElementTypeModel, 
  EnumTypeValueModel
} from './ogm-types.gen'

let userInst: UserModel

export const User = () => (userInst ??= getOgm().model('User'))

let atomInst: AtomModel

export const Atom = () => (atomInst ??= getOgm().model('Atom'))

let elementInst: ElementModel

export const Element = () => (elementInst ??= getOgm().model('Element'))

let pageInst: PageModel

export const Page = () => (pageInst ??= getOgm().model('Page'))

let componentInst: ComponentModel

export const Component = () => (componentInst ??= getOgm().model('Component'))
let tagInst: TagModel

export const Tag = () => (tagInst ??= getOgm().model('Tag'))

let interfaceInst: InterfaceTypeModel

export const InterfaceType = () =>
  (interfaceInst ??= getOgm().model('InterfaceType'))

let primitiveInst: PrimitiveTypeModel

export const PrimitiveType = () =>
  (primitiveInst ??= getOgm().model('PrimitiveType'))

let unionInst: UnionTypeModel

export const UnionType = () =>
  (unionInst ??= getOgm().model('UnionType'))

let arrayInst: ArrayTypeModel

export const ArrayType = () =>
  (arrayInst ??= getOgm().model('ArrayType'))

let enumInst: EnumTypeModel

export const EnumType = () =>
  (enumInst ??= getOgm().model('EnumType'))

let LambdaInst: LambdaTypeModel

export const LambdaType = () =>
  (LambdaInst ??= getOgm().model('LambdaType'))

let appInst: AppTypeModel

export const AppType = () =>
  (appInst ??= getOgm().model('AppType'))

let renderPropsInst: RenderPropsTypeModel

export const RenderPropsType = () =>
  (renderPropsInst ??= getOgm().model('RenderPropsType'))

let reactNodeInst: ReactNodeTypeModel

export const ReactNodeType = () =>
  (reactNodeInst ??= getOgm().model('ReactNodeType'))

let pageTypeInst: PageTypeModel

export const PageType = () =>
  (pageTypeInst ??= getOgm().model('PageType'))

let monacoInst: MonacoTypeModel

export const MonacoType = () =>
  (monacoInst ??= getOgm().model('MonacoType'))

let elementTypeInst: ElementTypeModel

export const ElementType = () =>
  (elementTypeInst ??= getOgm().model('ElementType'))

let enumTypeValuesInst: EnumTypeValueModel

export const EnumTypeValue = () =>
  (enumTypeValuesInst ??= getOgm().model('EnumTypeValue'))

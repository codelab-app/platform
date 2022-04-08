import { getOgm } from './infra/ogm'
import {
  AppTypeModel,
  ArrayTypeModel,
  AtomModel,
  ComponentModel,
  ElementModel,
  ElementTypeModel,
  EnumTypeModel,
  EnumTypeValueModel,
  InterfaceTypeModel,
  LambdaTypeModel,
  MonacoTypeModel,
  PageModel,
  PageTypeModel,
  PrimitiveTypeModel,
  ReactNodeTypeModel,
  RenderPropsTypeModel,
  StoreModel,
  TagModel,
  UnionTypeModel,
  UserModel,
} from './ogm-types.gen'

let userInst: UserModel

export const User = async () => (userInst ??= (await getOgm()).model('User'))

let atomInst: AtomModel

export const Atom = async () => (atomInst ??= (await getOgm()).model('Atom'))

let elementInst: ElementModel

export const Element = async () =>
  (elementInst ??= (await getOgm()).model('Element'))

let storeInst: StoreModel

export const Store = async () => (storeInst ??= (await getOgm()).model('Store'))

let pageInst: PageModel

export const Page = async () => (pageInst ??= (await getOgm()).model('Page'))

let componentInst: ComponentModel

export const Component = async () =>
  (componentInst ??= (await getOgm()).model('Component'))

let interfaceInst: InterfaceTypeModel

export const InterfaceType = async () =>
  (interfaceInst ??= (await getOgm()).model('InterfaceType'))

let tagInst: TagModel

export const Tag = async () => (tagInst ??= (await getOgm()).model('Tag'))

let primitiveInst: PrimitiveTypeModel

export const PrimitiveType = async () =>
  (primitiveInst ??= (await getOgm()).model('PrimitiveType'))

let unionInst: UnionTypeModel

export const UnionType = async () =>
  (unionInst ??= (await getOgm()).model('UnionType'))

let arrayInst: ArrayTypeModel

export const ArrayType = async () =>
  (arrayInst ??= (await getOgm()).model('ArrayType'))

let enumInst: EnumTypeModel

export const EnumType = async () =>
  (enumInst ??= (await getOgm()).model('EnumType'))

let LambdaInst: LambdaTypeModel

export const LambdaType = async () =>
  (LambdaInst ??= (await getOgm()).model('LambdaType'))

let appInst: AppTypeModel

export const AppType = async () =>
  (appInst ??= (await getOgm()).model('AppType'))

let renderPropsInst: RenderPropsTypeModel

export const RenderPropsType = async () =>
  (renderPropsInst ??= (await getOgm()).model('RenderPropsType'))

let reactNodeInst: ReactNodeTypeModel

export const ReactNodeType = async () =>
  (reactNodeInst ??= (await getOgm()).model('ReactNodeType'))

let pageTypeInst: PageTypeModel

export const PageType = async () =>
  (pageTypeInst ??= (await getOgm()).model('PageType'))

let monacoInst: MonacoTypeModel

export const MonacoType = async () =>
  (monacoInst ??= (await getOgm()).model('MonacoType'))

let elementTypeInst: ElementTypeModel

export const ElementType = async () =>
  (elementTypeInst ??= (await getOgm()).model('ElementType'))

let enumTypeValuesInst: EnumTypeValueModel

export const EnumTypeValue = async () =>
  (enumTypeValuesInst ??= (await getOgm()).model('EnumTypeValue'))

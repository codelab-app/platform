import { getOgm } from './infra/ogm'
import {
  AppTypeModel as IAppTypeModel,
  ArrayTypeModel as IArrayTypeModel,
  AtomModel as IAtomModel,
  ComponentModel as IComponentModel,
  ElementModel as IElementModel,
  ElementTypeModel as IElementTypeModel,
  EnumTypeModel as IEnumTypeModel,
  EnumTypeValueModel as IEnumTypeValueModel,
  InterfaceTypeModel as IInterfaceTypeModel,
  LambdaTypeModel as ILambdaTypeModel,
  MonacoTypeModel as IMonacoTypeModel,
  PageModel as IPageModel,
  PageTypeModel as IPageTypeModel,
  PrimitiveTypeModel as IPrimitiveTypeModel,
  ReactNodeTypeModel as IReactNodeTypeModel,
  RenderPropsTypeModel as IRenderPropsTypeModel,
  StoreModel as IStoreModel,
  TagModel as ITagModel,
  UnionTypeModel as IUnionTypeModel,
  UserModel as IUserModel,
} from './ogm-types.gen'

let userInst: IUserModel

export const UserModel = async () =>
  (userInst ??= (await getOgm()).model('User'))

let atomInst: IAtomModel

export const Atom = async () => (atomInst ??= (await getOgm()).model('Atom'))

let elementInst: IElementModel

export const Element = async () =>
  (elementInst ??= (await getOgm()).model('Element'))

let storeInst: IStoreModel

export const Store = async () => (storeInst ??= (await getOgm()).model('Store'))

let pageInst: IPageModel

export const PageModel = async () =>
  (pageInst ??= (await getOgm()).model('Page'))

let componentInst: IComponentModel

export const ComponentModel = async () =>
  (componentInst ??= (await getOgm()).model('Component'))

let interfaceInst: IInterfaceTypeModel

export const InterfaceTypeModel = async () =>
  (interfaceInst ??= (await getOgm()).model('InterfaceType'))

let tagInst: ITagModel

export const TagModel = async () => (tagInst ??= (await getOgm()).model('Tag'))

let primitiveInst: IPrimitiveTypeModel

export const PrimitiveTypeModel = async () =>
  (primitiveInst ??= (await getOgm()).model('PrimitiveType'))

let unionInst: IUnionTypeModel

export const UnionTypeModel = async () =>
  (unionInst ??= (await getOgm()).model('UnionType'))

let arrayInst: IArrayTypeModel

export const ArrayTypeModel = async () =>
  (arrayInst ??= (await getOgm()).model('ArrayType'))

let enumInst: IEnumTypeModel

export const EnumTypeModel = async () =>
  (enumInst ??= (await getOgm()).model('EnumType'))

let LambdaInst: ILambdaTypeModel

export const LambdaTypeModel = async () =>
  (LambdaInst ??= (await getOgm()).model('LambdaType'))

let appInst: IAppTypeModel

export const AppTypeModel = async () =>
  (appInst ??= (await getOgm()).model('AppType'))

let renderPropsInst: IRenderPropsTypeModel

export const RenderPropsTypeModel = async () =>
  (renderPropsInst ??= (await getOgm()).model('RenderPropsType'))

let reactNodeInst: IReactNodeTypeModel

export const ReactNodeTypeModel = async () =>
  (reactNodeInst ??= (await getOgm()).model('ReactNodeType'))

let pageTypeInst: IPageTypeModel

export const PageTypeModel = async () =>
  (pageTypeInst ??= (await getOgm()).model('PageType'))

let monacoInst: IMonacoTypeModel

export const MonacoTypeModel = async () =>
  (monacoInst ??= (await getOgm()).model('MonacoType'))

let elementTypeInst: IElementTypeModel

export const ElementTypeModel = async () =>
  (elementTypeInst ??= (await getOgm()).model('ElementType'))

let enumTypeValuesInst: IEnumTypeValueModel

export const EnumTypeValueModel = async () =>
  (enumTypeValuesInst ??= (await getOgm()).model('EnumTypeValue'))

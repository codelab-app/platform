import { OGM } from '@neo4j/graphql-ogm'
import { getOgm } from './ogm'
import {
  AppModel,
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
  ModelMap,
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

/**
 * If we pass in ogm, let's use that instead of cached instance.
 *
 * Generally this happens during jest specs
 */
const getOgmInstance = async <ModelKey extends keyof ModelMap>(
  inst: ModelMap[ModelKey],
  name: keyof ModelMap,
  ogm?: OGM<ModelMap>,
) => {
  if (ogm) {
    return ogm.model(name) as ModelMap[ModelKey]
  }

  return (inst ??= (await getOgm()).model(name))
}

let userInst: UserModel

export const UserOGM = async (ogm?: OGM<ModelMap>) =>
  await getOgmInstance<'User'>(userInst, 'User', ogm)

let appInst: AppModel

export const AppOGM = async (ogm?: OGM<ModelMap>) =>
  await getOgmInstance<'App'>(appInst, 'App', ogm)

let atomInst: AtomModel

export const AtomOGM = async (ogm?: OGM<ModelMap>) =>
  await getOgmInstance<'Atom'>(atomInst, 'Atom', ogm)

let elementInst: ElementModel

export const ElementOGM = async (ogm?: OGM<ModelMap>) =>
  await getOgmInstance<'Element'>(elementInst, 'Element', ogm)

let storeInst: StoreModel

export const StoreOGM = async (ogm?: OGM<ModelMap>) =>
  await getOgmInstance<'Store'>(storeInst, 'Store', ogm)

let pageInst: PageModel

export const PageOGM = async (ogm?: OGM<ModelMap>) =>
  await getOgmInstance<'Page'>(pageInst, 'Page', ogm)

let componentInst: ComponentModel

export const ComponentOGM = async (ogm?: OGM<ModelMap>) =>
  await getOgmInstance<'Component'>(componentInst, 'Component', ogm)

let interfaceInst: InterfaceTypeModel

export const InterfaceTypeOGM = async (ogm?: OGM<ModelMap>) =>
  await getOgmInstance<'InterfaceType'>(interfaceInst, 'InterfaceType', ogm)

let tagInst: TagModel

export const TagOGM = async (ogm?: OGM<ModelMap>) =>
  await getOgmInstance<'Tag'>(tagInst, 'Tag', ogm)

let primitiveInst: PrimitiveTypeModel

export const PrimitiveTypeOGM = async (ogm?: OGM<ModelMap>) =>
  await getOgmInstance<'PrimitiveType'>(primitiveInst, 'PrimitiveType', ogm)

let unionInst: UnionTypeModel

export const UnionTypeOGM = async (ogm?: OGM<ModelMap>) =>
  await getOgmInstance<'UnionType'>(unionInst, 'UnionType', ogm)

let arrayInst: ArrayTypeModel

export const ArrayTypeOGM = async (ogm?: OGM<ModelMap>) =>
  await getOgmInstance<'ArrayType'>(arrayInst, 'PrimitiveType', ogm)

let enumInst: EnumTypeModel

export const EnumTypeOGM = async (ogm?: OGM<ModelMap>) =>
  await getOgmInstance<'EnumType'>(enumInst, 'EnumType', ogm)

let LambdaInst: LambdaTypeModel

export const LambdaTypeOGM = async (ogm?: OGM<ModelMap>) =>
  await getOgmInstance<'LambdaType'>(LambdaInst, 'LambdaType', ogm)

let appTypeInst: AppTypeModel

export const AppTypeOGM = async (ogm?: OGM<ModelMap>) =>
  await getOgmInstance<'AppType'>(appTypeInst, 'AppType', ogm)

let renderPropsInst: RenderPropsTypeModel

export const RenderPropsTypeOGM = async (ogm?: OGM<ModelMap>) =>
  await getOgmInstance<'RenderPropsType'>(
    renderPropsInst,
    'RenderPropsType',
    ogm,
  )

let reactNodeInst: ReactNodeTypeModel

export const ReactNodeTypeOGM = async (ogm?: OGM<ModelMap>) =>
  await getOgmInstance<'ReactNodeType'>(reactNodeInst, 'ReactNodeType', ogm)

let pageTypeInst: PageTypeModel

export const PageTypeOGM = async (ogm?: OGM<ModelMap>) =>
  await getOgmInstance<'PageType'>(pageTypeInst, 'PageType', ogm)

let monacoInst: MonacoTypeModel

export const MonacoTypeOGM = async (ogm?: OGM<ModelMap>) =>
  await getOgmInstance<'MonacoType'>(monacoInst, 'MonacoType', ogm)

let elementTypeInst: ElementTypeModel

export const ElementTypeOGM = async (ogm?: OGM<ModelMap>) =>
  await getOgmInstance<'ElementType'>(elementTypeInst, 'ElementType', ogm)

let enumTypeValuesInst: EnumTypeValueModel

export const EnumTypeValueOGM = async (ogm?: OGM<ModelMap>) =>
  await getOgmInstance<'EnumTypeValue'>(
    enumTypeValuesInst,
    'EnumTypeValue',
    ogm,
  )

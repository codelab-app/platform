import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { OGM } from '@neo4j/graphql-ogm'
import { getOgm } from './ogm'

/**
 * If we pass in ogm, let's use that instead of cached instance.
 *
 * Generally this happens during jest specs
 */
const getOgmInstance = async <ModelKey extends keyof OGM_TYPES.ModelMap>(
  inst: OGM_TYPES.ModelMap[ModelKey],
  name: keyof OGM_TYPES.ModelMap,
  ogm?: OGM<OGM_TYPES.ModelMap>,
) => {
  if (ogm) {
    return ogm.model(name) as OGM_TYPES.ModelMap[ModelKey]
  }

  return (inst ??= (await getOgm()).model(name))
}

let userInst: OGM_TYPES.UserModel

export const UserOGM = async (ogm?: OGM<OGM_TYPES.ModelMap>) =>
  await getOgmInstance<'User'>(userInst, 'User', ogm)

let appInst: OGM_TYPES.AppModel

export const AppOGM = async (ogm?: OGM<OGM_TYPES.ModelMap>) =>
  await getOgmInstance<'App'>(appInst, 'App', ogm)

let atomInst: OGM_TYPES.AtomModel

export const AtomOGM = async (ogm?: OGM<OGM_TYPES.ModelMap>) =>
  await getOgmInstance<'Atom'>(atomInst, 'Atom', ogm)

let elementInst: OGM_TYPES.ElementModel

export const ElementOGM = async (ogm?: OGM<OGM_TYPES.ModelMap>) =>
  await getOgmInstance<'Element'>(elementInst, 'Element', ogm)

let storeInst: OGM_TYPES.StoreModel

export const StoreOGM = async (ogm?: OGM<OGM_TYPES.ModelMap>) =>
  await getOgmInstance<'Store'>(storeInst, 'Store', ogm)

let resourceInst: OGM_TYPES.ResourceModel

export const ResourceOGM = async (ogm?: OGM<OGM_TYPES.ModelMap>) =>
  await getOgmInstance<'Resource'>(resourceInst, 'Resource', ogm)

let pageInst: OGM_TYPES.PageModel

export const PageOGM = async (ogm?: OGM<OGM_TYPES.ModelMap>) =>
  await getOgmInstance<'Page'>(pageInst, 'Page', ogm)

let componentInst: OGM_TYPES.ComponentModel

export const ComponentOGM = async (ogm?: OGM<OGM_TYPES.ModelMap>) =>
  await getOgmInstance<'Component'>(componentInst, 'Component', ogm)

let interfaceInst: OGM_TYPES.InterfaceTypeModel

export const InterfaceTypeOGM = async (ogm?: OGM<OGM_TYPES.ModelMap>) =>
  await getOgmInstance<'InterfaceType'>(interfaceInst, 'InterfaceType', ogm)

let tagInst: OGM_TYPES.TagModel

export const TagOGM = async (ogm?: OGM<OGM_TYPES.ModelMap>) =>
  await getOgmInstance<'Tag'>(tagInst, 'Tag', ogm)

let primitiveInst: OGM_TYPES.PrimitiveTypeModel

export const PrimitiveTypeOGM = async (ogm?: OGM<OGM_TYPES.ModelMap>) =>
  await getOgmInstance<'PrimitiveType'>(primitiveInst, 'PrimitiveType', ogm)

let unionInst: OGM_TYPES.UnionTypeModel

export const UnionTypeOGM = async (ogm?: OGM<OGM_TYPES.ModelMap>) =>
  await getOgmInstance<'UnionType'>(unionInst, 'UnionType', ogm)

let arrayInst: OGM_TYPES.ArrayTypeModel

export const ArrayTypeOGM = async (ogm?: OGM<OGM_TYPES.ModelMap>) =>
  await getOgmInstance<'ArrayType'>(arrayInst, 'PrimitiveType', ogm)

let enumInst: OGM_TYPES.EnumTypeModel

export const EnumTypeOGM = async (ogm?: OGM<OGM_TYPES.ModelMap>) =>
  await getOgmInstance<'EnumType'>(enumInst, 'EnumType', ogm)

let LambdaInst: OGM_TYPES.LambdaTypeModel

export const LambdaTypeOGM = async (ogm?: OGM<OGM_TYPES.ModelMap>) =>
  await getOgmInstance<'LambdaType'>(LambdaInst, 'LambdaType', ogm)

let appTypeInst: OGM_TYPES.AppTypeModel

export const AppTypeOGM = async (ogm?: OGM<OGM_TYPES.ModelMap>) =>
  await getOgmInstance<'AppType'>(appTypeInst, 'AppType', ogm)

let actionTypeInst: OGM_TYPES.ActionTypeModel

export const ActionTypeOGM = async (ogm?: OGM<OGM_TYPES.ModelMap>) =>
  await getOgmInstance<'ActionType'>(actionTypeInst, 'ActionType', ogm)

let renderPropsInst: OGM_TYPES.RenderPropsTypeModel

export const RenderPropsTypeOGM = async (ogm?: OGM<OGM_TYPES.ModelMap>) =>
  await getOgmInstance<'RenderPropsType'>(
    renderPropsInst,
    'RenderPropsType',
    ogm,
  )

let reactNodeInst: OGM_TYPES.ReactNodeTypeModel

export const ReactNodeTypeOGM = async (ogm?: OGM<OGM_TYPES.ModelMap>) =>
  await getOgmInstance<'ReactNodeType'>(reactNodeInst, 'ReactNodeType', ogm)

let pageTypeInst: OGM_TYPES.PageTypeModel

export const PageTypeOGM = async (ogm?: OGM<OGM_TYPES.ModelMap>) =>
  await getOgmInstance<'PageType'>(pageTypeInst, 'PageType', ogm)

let monacoInst: OGM_TYPES.MonacoTypeModel

export const MonacoTypeOGM = async (ogm?: OGM<OGM_TYPES.ModelMap>) =>
  await getOgmInstance<'MonacoType'>(monacoInst, 'MonacoType', ogm)

let elementTypeInst: OGM_TYPES.ElementTypeModel

export const ElementTypeOGM = async (ogm?: OGM<OGM_TYPES.ModelMap>) =>
  await getOgmInstance<'ElementType'>(elementTypeInst, 'ElementType', ogm)

let enumTypeValuesInst: OGM_TYPES.EnumTypeValueModel

export const EnumTypeValueOGM = async (ogm?: OGM<OGM_TYPES.ModelMap>) =>
  await getOgmInstance<'EnumTypeValue'>(
    enumTypeValuesInst,
    'EnumTypeValue',
    ogm,
  )

import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { getOgm } from './ogm'

/**
 * If we pass in ogm, let's use that instead of cached instance.
 *
 * Generally this happens during jest specs
 */
const getOgmInstance = async <ModelKey extends keyof OGM_TYPES.ModelMap>(
  inst: OGM_TYPES.ModelMap[ModelKey] | null,
  name: keyof OGM_TYPES.ModelMap,
) => {
  if (!inst) {
    const ogm = await getOgm()

    return ogm.model(name) as OGM_TYPES.ModelMap[ModelKey]
  }

  return inst
}

let domainInst: OGM_TYPES.DomainModel

export const DomainOGM = async () =>
  await getOgmInstance<'Domain'>(domainInst, 'Domain')

let userInst: OGM_TYPES.UserModel

export const UserOGM = async () =>
  await getOgmInstance<'User'>(userInst, 'User')

let appInst: OGM_TYPES.AppModel

export const AppOGM = async () => await getOgmInstance<'App'>(appInst, 'App')

let atomInst: OGM_TYPES.AtomModel

export const AtomOGM = async () =>
  await getOgmInstance<'Atom'>(atomInst, 'Atom')

let elementInst: OGM_TYPES.ElementModel

export const ElementOGM = async () =>
  await getOgmInstance<'Element'>(elementInst, 'Element')

let codeActionInst: OGM_TYPES.CodeActionModel

export const CodeActionOGM = async () =>
  await getOgmInstance<'CodeAction'>(codeActionInst, 'CodeAction')

let apiActionInst: OGM_TYPES.ApiActionModel

export const ApiActionOGM = async () =>
  await getOgmInstance<'ApiAction'>(apiActionInst, 'ApiAction')

let storeInst: OGM_TYPES.StoreModel

export const StoreOGM = async () =>
  await getOgmInstance<'Store'>(storeInst, 'Store')

let resourceInst: OGM_TYPES.ResourceModel

export const ResourceOGM = async () =>
  await getOgmInstance<'Resource'>(resourceInst, 'Resource')

let pageInst: OGM_TYPES.PageModel

export const PageOGM = async () =>
  await getOgmInstance<'Page'>(pageInst, 'Page')

let componentInst: OGM_TYPES.ComponentModel

export const ComponentOGM = async () =>
  await getOgmInstance<'Component'>(componentInst, 'Component')

let interfaceInst: OGM_TYPES.InterfaceTypeModel

export const InterfaceTypeOGM = async () =>
  await getOgmInstance<'InterfaceType'>(interfaceInst, 'InterfaceType')

let tagInst: OGM_TYPES.TagModel

export const TagOGM = async () => await getOgmInstance<'Tag'>(tagInst, 'Tag')

let primitiveInst: OGM_TYPES.PrimitiveTypeModel

export const PrimitiveTypeOGM = async () =>
  await getOgmInstance<'PrimitiveType'>(primitiveInst, 'PrimitiveType')

let unionInst: OGM_TYPES.UnionTypeModel

export const UnionTypeOGM = async () =>
  await getOgmInstance<'UnionType'>(unionInst, 'UnionType')

let arrayInst: OGM_TYPES.ArrayTypeModel

export const ArrayTypeOGM = async () =>
  await getOgmInstance<'ArrayType'>(arrayInst, 'PrimitiveType')

let enumInst: OGM_TYPES.EnumTypeModel

export const EnumTypeOGM = async () =>
  await getOgmInstance<'EnumType'>(enumInst, 'EnumType')

let LambdaInst: OGM_TYPES.LambdaTypeModel

export const LambdaTypeOGM = async () =>
  await getOgmInstance<'LambdaType'>(LambdaInst, 'LambdaType')

let appTypeInst: OGM_TYPES.AppTypeModel

export const AppTypeOGM = async () =>
  await getOgmInstance<'AppType'>(appTypeInst, 'AppType')

let actionTypeInst: OGM_TYPES.ActionTypeModel

export const ActionTypeOGM = async () =>
  await getOgmInstance<'ActionType'>(actionTypeInst, 'ActionType')

let renderPropsInst: OGM_TYPES.RenderPropsTypeModel

export const RenderPropsTypeOGM = async () =>
  await getOgmInstance<'RenderPropsType'>(renderPropsInst, 'RenderPropsType')

let reactNodeInst: OGM_TYPES.ReactNodeTypeModel

export const ReactNodeTypeOGM = async () =>
  await getOgmInstance<'ReactNodeType'>(reactNodeInst, 'ReactNodeType')

let pageTypeInst: OGM_TYPES.PageTypeModel

export const PageTypeOGM = async () =>
  await getOgmInstance<'PageType'>(pageTypeInst, 'PageType')

let codeMirrorInst: OGM_TYPES.CodeMirrorTypeModel

export const CodeMirrorTypeOGM = async () =>
  await getOgmInstance<'CodeMirrorType'>(codeMirrorInst, 'CodeMirrorType')

let elementTypeInst: OGM_TYPES.ElementTypeModel

export const ElementTypeOGM = async () =>
  await getOgmInstance<'ElementType'>(elementTypeInst, 'ElementType')

let enumTypeValuesInst: OGM_TYPES.EnumTypeValueModel

export const EnumTypeValueOGM = async () =>
  await getOgmInstance<'EnumTypeValue'>(enumTypeValuesInst, 'EnumTypeValue')

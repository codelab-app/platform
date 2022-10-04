import { OGM_TYPES } from '@codelab/backend/abstract/codegen'
import { IRepository } from '@codelab/backend/infra/ports'
import { getOgm } from './ogm'

export class Repository implements IRepository {
  private user: OGM_TYPES.UserModel | undefined

  //
  // App
  //
  private app: OGM_TYPES.AppModel | undefined

  private domain: OGM_TYPES.DomainModel | undefined

  private page: OGM_TYPES.PageModel | undefined

  //
  // Store
  //
  private store: OGM_TYPES.StoreModel | undefined

  private apiAction: OGM_TYPES.ApiActionModel | undefined

  private codeAction: OGM_TYPES.CodeActionModel | undefined

  private resource: OGM_TYPES.ResourceModel | undefined

  //
  // Component
  //
  private atom: OGM_TYPES.AtomModel | undefined

  private element: OGM_TYPES.ElementModel | undefined

  private component: OGM_TYPES.ComponentModel | undefined

  private tag: OGM_TYPES.TagModel | undefined

  //
  // Types
  //
  private interfaceType: OGM_TYPES.InterfaceTypeModel | undefined

  private primitiveType: OGM_TYPES.PrimitiveTypeModel | undefined

  private unionType: OGM_TYPES.UnionTypeModel | undefined

  private arrayType: OGM_TYPES.ArrayTypeModel | undefined

  private enumType: OGM_TYPES.EnumTypeModel | undefined

  private enumTypeValue: OGM_TYPES.EnumTypeValueModel | undefined

  private lambdaType: OGM_TYPES.LambdaTypeModel | undefined

  private appType: OGM_TYPES.AppTypeModel | undefined

  private actionType: OGM_TYPES.ActionTypeModel | undefined

  private renderPropsType: OGM_TYPES.RenderPropsTypeModel | undefined

  private reactNodeType: OGM_TYPES.ReactNodeTypeModel | undefined

  private pageType: OGM_TYPES.PageTypeModel | undefined

  private codeMirrorType: OGM_TYPES.CodeMirrorTypeModel | undefined

  private elementType: OGM_TYPES.ElementTypeModel | undefined

  private static _instance?: Repository

  private constructor() {
    if (Repository._instance) {
      throw new Error('Use Repository.instance instead of new.')
    }

    Repository._instance = this
  }

  static get instance() {
    return (Repository._instance ??= new Repository())
  }

  get User() {
    return (async () =>
      (this.user ??= await this.getOgmInstance<'User'>(this.user, 'User')))()
  }

  //
  // App
  //

  get App() {
    return (async () =>
      (this.app ??= await this.getOgmInstance<'App'>(this.app, 'App')))()
  }

  get Domain() {
    return (async () =>
      (this.domain ??= await this.getOgmInstance<'Domain'>(
        this.domain,
        'Domain',
      )))()
  }

  get Page() {
    return (async () =>
      (this.page ??= await this.getOgmInstance<'Page'>(this.page, 'Page')))()
  }

  //
  // Store
  //

  get Store() {
    return (async () =>
      (this.store ??= await this.getOgmInstance<'Store'>(
        this.store,
        'Store',
      )))()
  }

  get ApiAction() {
    return (async () =>
      (this.apiAction ??= await this.getOgmInstance<'ApiAction'>(
        this.apiAction,
        'ApiAction',
      )))()
  }

  get CodeAction() {
    return (async () =>
      (this.codeAction ??= await this.getOgmInstance<'CodeAction'>(
        this.codeAction,
        'CodeAction',
      )))()
  }

  get Resource() {
    return (async () =>
      (this.resource ??= await this.getOgmInstance<'Resource'>(
        this.resource,
        'Resource',
      )))()
  }

  //
  // Component
  //

  get Atom() {
    return (async () =>
      (this.atom ??= await this.getOgmInstance<'Atom'>(this.atom, 'Atom')))()
  }

  get Element() {
    return (async () =>
      (this.element ??= await this.getOgmInstance<'Element'>(
        this.element,
        'Element',
      )))()
  }

  get Component() {
    return (async () =>
      (this.component ??= await this.getOgmInstance<'Component'>(
        this.component,
        'Component',
      )))()
  }

  get Tag() {
    return (async () =>
      (this.tag ??= await this.getOgmInstance<'Tag'>(this.tag, 'Tag')))()
  }

  //
  // Types
  //

  get InterfaceType() {
    return (async () =>
      (this.interfaceType ??= await this.getOgmInstance<'InterfaceType'>(
        this.interfaceType,
        'InterfaceType',
      )))()
  }

  get PrimitiveType() {
    return (async () =>
      (this.primitiveType ??= await this.getOgmInstance<'PrimitiveType'>(
        this.primitiveType,
        'PrimitiveType',
      )))()
  }

  get UnionType() {
    return (async () =>
      (this.unionType ??= await this.getOgmInstance<'UnionType'>(
        this.unionType,
        'UnionType',
      )))()
  }

  get ArrayType() {
    return (async () =>
      (this.arrayType ??= await this.getOgmInstance<'ArrayType'>(
        this.arrayType,
        'ArrayType',
      )))()
  }

  get EnumType() {
    return (async () =>
      (this.enumType ??= await this.getOgmInstance<'EnumType'>(
        this.enumType,
        'EnumType',
      )))()
  }

  get EnumTypeValue() {
    return (async () =>
      (this.enumTypeValue ??= await this.getOgmInstance<'EnumTypeValue'>(
        this.enumTypeValue,
        'EnumTypeValue',
      )))()
  }

  get LambdaType() {
    return (async () =>
      (this.lambdaType ??= await this.getOgmInstance<'LambdaType'>(
        this.lambdaType,
        'LambdaType',
      )))()
  }

  get AppType() {
    return (async () =>
      (this.appType ??= await this.getOgmInstance<'AppType'>(
        this.appType,
        'AppType',
      )))()
  }

  get ActionType() {
    return (async () =>
      (this.actionType ??= await this.getOgmInstance<'ActionType'>(
        this.actionType,
        'ActionType',
      )))()
  }

  get RenderPropsType() {
    return (async () =>
      (this.renderPropsType ??= await this.getOgmInstance<'RenderPropsType'>(
        this.renderPropsType,
        'RenderPropsType',
      )))()
  }

  get ReactNodeType() {
    return (async () =>
      (this.reactNodeType ??= await this.getOgmInstance<'ReactNodeType'>(
        this.reactNodeType,
        'ReactNodeType',
      )))()
  }

  get PageType() {
    return (async () =>
      (this.pageType ??= await this.getOgmInstance<'PageType'>(
        this.pageType,
        'PageType',
      )))()
  }

  get CodeMirrorType() {
    return (async () =>
      (this.codeMirrorType ??= await this.getOgmInstance<'CodeMirrorType'>(
        this.codeMirrorType,
        'CodeMirrorType',
      )))()
  }

  get ElementType() {
    return (async () =>
      (this.elementType ??= await this.getOgmInstance<'ElementType'>(
        this.elementType,
        'ElementType',
      )))()
  }

  private getOgmInstance = async <ModelKey extends keyof OGM_TYPES.ModelMap>(
    inst: OGM_TYPES.ModelMap[ModelKey] | undefined,
    name: keyof OGM_TYPES.ModelMap,
  ) => {
    if (!inst) {
      const ogm = await getOgm()

      return ogm.model(name) as OGM_TYPES.ModelMap[ModelKey]
    }

    return inst
  }
}

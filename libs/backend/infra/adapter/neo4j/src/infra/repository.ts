import type {
  ActionTypeModel,
  ApiActionModel,
  AppModel,
  AppTypeModel,
  ArrayTypeModel,
  AtomModel,
  CodeActionModel,
  CodeMirrorTypeModel,
  ComponentModel,
  DomainModel,
  ElementModel,
  ElementTypeModel,
  EnumTypeModel,
  EnumTypeValueModel,
  FieldModel,
  InterfaceTypeModel,
  LambdaTypeModel,
  ModelMap,
  PageModel,
  PageTypeModel,
  PrimitiveTypeModel,
  PropModel,
  ReactNodeTypeModel,
  RenderPropTypeModel,
  ResourceModel,
  StoreModel,
  TagModel,
  UnionTypeModel,
  UserModel,
} from '@codelab/backend/abstract/codegen'
import type { INeo4jRepository } from '@codelab/backend/abstract/types'
import { getOgm } from './ogm'

export class Repository implements INeo4jRepository {
  private user: UserModel | undefined

  //
  // App
  //
  private app: AppModel | undefined

  private domain: DomainModel | undefined

  private page: PageModel | undefined

  //
  // Store
  //
  private store: StoreModel | undefined

  private apiAction: ApiActionModel | undefined

  private codeAction: CodeActionModel | undefined

  private resource: ResourceModel | undefined

  //
  // Component
  //
  private atom: AtomModel | undefined

  private element: ElementModel | undefined

  private prop: PropModel | undefined

  private component: ComponentModel | undefined

  private tag: TagModel | undefined

  //
  // Types
  //
  private field: FieldModel | undefined

  private interfaceType: InterfaceTypeModel | undefined

  private primitiveType: PrimitiveTypeModel | undefined

  private unionType: UnionTypeModel | undefined

  private arrayType: ArrayTypeModel | undefined

  private enumType: EnumTypeModel | undefined

  private enumTypeValue: EnumTypeValueModel | undefined

  private lambdaType: LambdaTypeModel | undefined

  private appType: AppTypeModel | undefined

  private actionType: ActionTypeModel | undefined

  private renderPropType: RenderPropTypeModel | undefined

  private reactNodeType: ReactNodeTypeModel | undefined

  private pageType: PageTypeModel | undefined

  private codeMirrorType: CodeMirrorTypeModel | undefined

  private elementType: ElementTypeModel | undefined

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

  get Prop() {
    return (async () =>
      (this.prop ??= await this.getOgmInstance<'Prop'>(this.prop, 'Prop')))()
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

  get Field() {
    return (async () =>
      (this.field ??= await this.getOgmInstance<'Field'>(
        this.field,
        'Field',
      )))()
  }

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

  get RenderPropType() {
    return (async () =>
      (this.renderPropType ??= await this.getOgmInstance<'RenderPropType'>(
        this.renderPropType,
        'RenderPropType',
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

  private getOgmInstance = async <ModelKey extends keyof ModelMap>(
    inst: ModelMap[ModelKey] | undefined,
    name: keyof ModelMap,
  ) => {
    const ogm = await getOgm()

    if (!inst) {
      return ogm.model(name) as ModelMap[ModelKey]
    }

    return inst
  }
}

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
import { OGM } from '@neo4j/graphql-ogm'
import { Inject, Injectable } from '@nestjs/common'
import { OGM_PROVIDER } from './ogm.constant'

@Injectable()
export class OGMService {
  constructor(@Inject(OGM_PROVIDER) private ogm: OGM<ModelMap>) {}

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

  get User() {
    return (this.user ??= this.ogm.model('User'))
  }

  //
  // App
  //

  get App() {
    return (this.app ??= this.ogm.model('App'))
  }

  get Domain() {
    return (this.domain ??= this.ogm.model('Domain'))
  }

  get Page() {
    return (this.page ??= this.ogm.model('Page'))
  }

  //
  // Store
  //

  get Store() {
    return (this.store ??= this.ogm.model('Store'))
  }

  get ApiAction() {
    return (this.apiAction ??= this.ogm.model('ApiAction'))
  }

  get CodeAction() {
    return (this.codeAction ??= this.ogm.model('CodeAction'))
  }

  get Resource() {
    return (this.resource ??= this.ogm.model('Resource'))
  }

  //
  // Component
  //

  get Atom() {
    return (this.atom ??= this.ogm.model('Atom'))
  }

  get Element() {
    return (this.element ??= this.ogm.model('Element'))
  }

  get Prop() {
    return (this.prop ??= this.ogm.model('Prop'))
  }

  get Component() {
    return (this.component ??= this.ogm.model('Component'))
  }

  get Tag() {
    return (this.tag ??= this.ogm.model('Tag'))
  }

  //
  // Types
  //

  get Field() {
    return (this.field ??= this.ogm.model('Field'))
  }

  get InterfaceType() {
    return (this.interfaceType ??= this.ogm.model('InterfaceType'))
  }

  get PrimitiveType() {
    return (this.primitiveType ??= this.ogm.model('PrimitiveType'))
  }

  get UnionType() {
    return (this.unionType ??= this.ogm.model('UnionType'))
  }

  get ArrayType() {
    return (this.arrayType ??= this.ogm.model('ArrayType'))
  }

  get EnumType() {
    return (this.enumType ??= this.ogm.model('EnumType'))
  }

  get EnumTypeValue() {
    return (this.enumTypeValue ??= this.ogm.model('EnumTypeValue'))
  }

  get LambdaType() {
    return (this.lambdaType ??= this.ogm.model('LambdaType'))
  }

  get AppType() {
    return (this.appType ??= this.ogm.model('AppType'))
  }

  get ActionType() {
    return (this.actionType ??= this.ogm.model('ActionType'))
  }

  get RenderPropType() {
    return (this.renderPropType ??= this.ogm.model('RenderPropType'))
  }

  get ReactNodeType() {
    return (this.reactNodeType ??= this.ogm.model('ReactNodeType'))
  }

  get PageType() {
    return (this.pageType ??= this.ogm.model('PageType'))
  }

  get CodeMirrorType() {
    return (this.codeMirrorType ??= this.ogm.model('CodeMirrorType'))
  }

  get ElementType() {
    return (this.elementType ??= this.ogm.model('ElementType'))
  }
}

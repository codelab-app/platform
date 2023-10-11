import type {
  ActionTypeModel,
  ApiActionModel,
  AppModel,
  AppTypeModel,
  ArrayTypeModel,
  AtomModel,
  AuthGuardModel,
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
import { generate, OGM } from '@neo4j/graphql-ogm'
import { Inject, Injectable } from '@nestjs/common'
import * as fs from 'fs'
import path from 'path'
import prettier from 'prettier'
import { OGM_PROVIDER } from './ogm.constant'

@Injectable()
export class OgmService {
  constructor(@Inject(OGM_PROVIDER) private ogm: OGM<ModelMap>) {}

  get ActionType() {
    return (this.actionType ??= this.ogm.model('ActionType'))
  }

  get ApiAction() {
    return (this.apiAction ??= this.ogm.model('ApiAction'))
  }

  get App() {
    return (this.app ??= this.ogm.model('App'))
  }

  get AppType() {
    return (this.appType ??= this.ogm.model('AppType'))
  }

  get ArrayType() {
    return (this.arrayType ??= this.ogm.model('ArrayType'))
  }

  get Atom() {
    return (this.atom ??= this.ogm.model('Atom'))
  }

  get CodeAction() {
    return (this.codeAction ??= this.ogm.model('CodeAction'))
  }

  get CodeMirrorType() {
    return (this.codeMirrorType ??= this.ogm.model('CodeMirrorType'))
  }

  get Component() {
    return (this.component ??= this.ogm.model('Component'))
  }

  get Domain() {
    return (this.domain ??= this.ogm.model('Domain'))
  }

  get Element() {
    return (this.element ??= this.ogm.model('Element'))
  }

  get ElementType() {
    return (this.elementType ??= this.ogm.model('ElementType'))
  }

  get EnumType() {
    return (this.enumType ??= this.ogm.model('EnumType'))
  }

  get EnumTypeValue() {
    return (this.enumTypeValue ??= this.ogm.model('EnumTypeValue'))
  }

  get Field() {
    return (this.field ??= this.ogm.model('Field'))
  }

  get InterfaceType() {
    return (this.interfaceType ??= this.ogm.model('InterfaceType'))
  }

  get LambdaType() {
    return (this.lambdaType ??= this.ogm.model('LambdaType'))
  }

  get Page() {
    return (this.page ??= this.ogm.model('Page'))
  }

  get PageType() {
    return (this.pageType ??= this.ogm.model('PageType'))
  }

  get PrimitiveType() {
    return (this.primitiveType ??= this.ogm.model('PrimitiveType'))
  }

  get Prop() {
    return (this.prop ??= this.ogm.model('Prop'))
  }

  get ReactNodeType() {
    return (this.reactNodeType ??= this.ogm.model('ReactNodeType'))
  }

  get RenderPropType() {
    return (this.renderPropType ??= this.ogm.model('RenderPropType'))
  }

  get Resource() {
    return (this.resource ??= this.ogm.model('Resource'))
  }

  get AuthGuard() {
    return (this.authGuard ??= this.ogm.model('AuthGuard'))
  }

  get Store() {
    return (this.store ??= this.ogm.model('Store'))
  }

  get Tag() {
    return (this.tag ??= this.ogm.model('Tag'))
  }

  get UnionType() {
    return (this.unionType ??= this.ogm.model('UnionType'))
  }

  get User() {
    return (this.user ??= this.ogm.model('User'))
  }

  async generate() {
    const outFile = path.resolve(
      process.cwd(),
      'libs/backend/abstract/codegen',
      'src/ogm-types.gen.ts',
    )

    const output = await generate({
      noWrite: true,
      ogm: this.ogm,
      outFile,
    })
      .then((data) => {
        console.info('OGM type generated!!')

        // Change optional to required
        return data?.replace(/__typename\?:/g, '__typename:')
      })
      .catch((error) =>
        console.error(`[generateOgmTypes] ${JSON.stringify(error, null, 2)}`),
      )

    // Get prettier config
    const options = await prettier.resolveConfig(outFile)

    // Format
    const formatted = await prettier.format(`${output}`, {
      ...options,
      filepath: outFile,
    })

    /**
     * Save to abstract folder as well for exporting just the interfaces
     */
    fs.writeFileSync(outFile, formatted)
  }

  private actionType: ActionTypeModel | undefined

  private apiAction: ApiActionModel | undefined

  private app: AppModel | undefined

  private appType: AppTypeModel | undefined

  private arrayType: ArrayTypeModel | undefined

  private atom: AtomModel | undefined

  private codeAction: CodeActionModel | undefined

  private codeMirrorType: CodeMirrorTypeModel | undefined

  private component: ComponentModel | undefined

  private domain: DomainModel | undefined

  private element: ElementModel | undefined

  private elementType: ElementTypeModel | undefined

  private enumType: EnumTypeModel | undefined

  private enumTypeValue: EnumTypeValueModel | undefined

  private field: FieldModel | undefined

  private interfaceType: InterfaceTypeModel | undefined

  private lambdaType: LambdaTypeModel | undefined

  private page: PageModel | undefined

  private pageType: PageTypeModel | undefined

  private primitiveType: PrimitiveTypeModel | undefined

  private prop: PropModel | undefined

  private reactNodeType: ReactNodeTypeModel | undefined

  private renderPropType: RenderPropTypeModel | undefined

  private resource: ResourceModel | undefined

  private authGuard: AuthGuardModel | undefined

  private store: StoreModel | undefined

  private tag: TagModel | undefined

  private unionType: UnionTypeModel | undefined

  private user: UserModel | undefined
}

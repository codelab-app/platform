/// <reference types='jest'/>

import type { IType } from '@codelab/frontend/abstract/core'
import {
  atomRef,
  CUSTOM_TEXT_PROP_KEY,
  elementTreeRef,
  RendererType,
  typeRef,
} from '@codelab/frontend/abstract/core'
import { AppService } from '@codelab/frontend/domain/app'
import { Atom, AtomService } from '@codelab/frontend/domain/atom'
import { ComponentService } from '@codelab/frontend/domain/component'
import { ElementService } from '@codelab/frontend/domain/element'
import { PageService } from '@codelab/frontend/domain/page'
import { PropService } from '@codelab/frontend/domain/prop'
import { ActionService, StoreService } from '@codelab/frontend/domain/store'
import { TagService } from '@codelab/frontend/domain/tag'
import {
  FieldService,
  InterfaceType,
  PrimitiveType,
  ReactNodeType,
  RenderPropType,
  TypeService,
} from '@codelab/frontend/domain/type'
import { User, UserService } from '@codelab/frontend/domain/user'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { IAtomType, IPageKind } from '@codelab/shared/abstract/core'
import { frozen, objectMap, unregisterRootStore } from 'mobx-keystone'
import { v4 } from 'uuid'
import { RenderService } from '../../render.service'
import { Renderer } from '../../renderer.model'
import { PassThroughRenderPipe } from '../../renderPipes/passThroughRenderPipe'
import type { RenderPipeClass } from '../../renderPipes/renderPipe.factory'
import { renderPipeFactory } from '../../renderPipes/renderPipe.factory'
import { TestRootStore } from './test-root-store'
import type { ITestRootStore, TestServices } from './test-root-store.interface'

const stubServiceRepositories = (rootStore: ITestRootStore) => {
  jest.spyOn(rootStore.appService.appRepository, 'add').mockImplementation()
  jest.spyOn(rootStore.pageService.pageRepository, 'add').mockImplementation()

  jest
    .spyOn(rootStore.elementService.elementRepository, 'add')
    .mockImplementation()

  jest
    .spyOn(rootStore.componentService.componentRepository, 'add')
    .mockImplementation()

  jest.spyOn(rootStore.storeService.storeRepository, 'add').mockImplementation()
  jest.spyOn(rootStore.propService.propRepository, 'add').mockImplementation()
}

// Clone everything so that we don't get conflicts between different test files.
export const setupTestForRenderer = (pipes: Array<RenderPipeClass> = []) => {
  let data: TestServices = {} as TestServices

  beforeEach(async () => {
    const user = new User({ auth0Id: v4(), id: v4(), username: '' })
    const pageId = v4()

    const emptyInterface = new InterfaceType({
      name: 'Empty interface',
      owner: { auth0Id: user.auth0Id },
    })

    const divAtom = new Atom({
      api: typeRef(emptyInterface),
      name: 'Html Div',
      owner: { auth0Id: user.auth0Id },
      tags: [],
      type: IAtomType.HtmlDiv,
    })

    const textAtom = new Atom({
      api: typeRef(emptyInterface),
      name: 'Text',
      owner: { auth0Id: user.auth0Id },
      tags: [],
      type: IAtomType.Text,
    })

    const primitiveType = new PrimitiveType({
      name: 'primitiveType',
      owner: { auth0Id: user.auth0Id },
      primitiveKind: PrimitiveTypeKind.Integer,
    })

    const renderPropType = new RenderPropType({
      name: 'renderPropType',
      owner: { auth0Id: user.auth0Id },
    })

    const reactNodeType = new ReactNodeType({
      name: 'reactNodeType',
      owner: { auth0Id: user.auth0Id },
    })

    const rootStore = new TestRootStore({
      actionService: new ActionService({}),
      appService: new AppService({}),
      atomService: new AtomService({
        atoms: objectMap([
          [divAtom.id, divAtom],
          [textAtom.id, textAtom],
        ]),
      }),
      builderRenderService: new RenderService({}),
      componentService: new ComponentService({}),
      elementService: new ElementService({}),
      fieldService: new FieldService({}),
      pageService: new PageService({}),
      propService: new PropService({}),
      storeService: new StoreService({}),
      tagService: new TagService({}),
      typeService: new TypeService({
        types: objectMap<IType>([
          [primitiveType.id, primitiveType],
          [renderPropType.id, renderPropType],
          [reactNodeType.id, reactNodeType],
          [emptyInterface.id, emptyInterface],
        ]),
      }),
      userService: new UserService({ user }),
    })

    stubServiceRepositories(rootStore)

    const app = await rootStore.appService.create({
      id: v4(),
      name: 'app',
      owner: { auth0Id: user.auth0Id },
    })

    const page = await rootStore.pageService.create({
      app: { id: app.id },
      id: pageId,
      kind: IPageKind.Regular,
      name: 'page',
      owner: { auth0Id: user.auth0Id },
      url: '/page',
    })

    page.rootElement.current.props.current.setMany({
      prop01: 'prop01Value',
      prop02: 'prop02Value',
      prop03: {
        type: primitiveType.id,
        value: 'prop03Value',
      },
    })

    page.rootElement.current.setRenderType(atomRef(divAtom))
    page.rootElement.current.setPropTransformationJs(`
      // Write a transformer function, you get the input props as parameter
      // All returned props will get merged with the original ones
      function transform(props) {
        return Object.keys(props)
          .map((x)=> ({
              [\`$\{x}-edited\`] : props[x]
            }))
          .reduce((total,current) =>
            ({...total,...current}),
            {}
          )
      }
  `)

    const component = await rootStore.componentService.create({
      id: v4(),
      keyGenerator: `function run(props) {
        // props are of type component api
          return props.id
      }`,
      name: 'My Component',
      owner: { auth0Id: user.auth0Id },
    })

    component.rootElement.current.setRenderType(atomRef(textAtom))
    component.rootElement.current.props.current.setMany({
      componentProp: 'original',
      [CUSTOM_TEXT_PROP_KEY]: "I'm a component",
    })

    const componentInstance = await rootStore.elementService.create({
      id: v4(),
      name: '01',
      parentElement: { id: page.rootElement.id },
      props: { data: JSON.stringify({ componentProp: 'instance' }) },
      renderType: {
        id: component.id,
        kind: IRenderTypeKind.Component,
      },
    })

    const renderer: IRenderer = new Renderer({
      debugMode: false,
      elementTree: elementTreeRef(page),
      rendererType: RendererType.PageBuilder,
      renderPipe: renderPipeFactory([PassThroughRenderPipe, ...pipes]),
    })

    rootStore.setRenderer(renderer)

    data = {
      component,
      componentInstance,
      componentRootElement: component.rootElement.current,
      page,
      pageRootElement: page.rootElement.current,
      reactNodeType,
      renderer,
      renderPropType,
      rootStore,
    }

    return data
  })

  afterEach(() => {
    unregisterRootStore(data.rootStore)
  })

  console.log(data)

  return data
}

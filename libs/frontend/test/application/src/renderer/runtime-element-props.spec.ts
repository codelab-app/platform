import type {
  IRuntimeComponentModel,
  NextjsSearchParamsProps,
} from '@codelab/frontend-abstract-application'
import type { IResourceFetchConfig } from '@codelab/shared-abstract-core'

import { RendererType } from '@codelab/frontend-abstract-application'
import { DATA_ELEMENT_ID } from '@codelab/frontend-abstract-domain'
import {
  createTestStore,
  RootStoreProvider,
} from '@codelab/frontend-infra-mobx-store'
import { IAtomType, IPageKind } from '@codelab/shared-abstract-core'
import { act, render } from '@testing-library/react'
import { configure } from 'mobx'
import { createElement } from 'react'

let testStore: ReturnType<typeof createTestStore>
let rootStore: ReturnType<typeof createTestStore>['rootStore']

describe('Runtime Element props', () => {
  beforeEach(() => {
    testStore = createTestStore()
    rootStore = testStore.rootStore
  })

  afterAll(() => {
    rootStore.teardown()
  })

  describe('RuntimeProps.props', () => {
    it('should contain system props', () => {
      const { rootElement, runtimeRootElement } =
        rootStore.setupRuntimeElement()

      const runtimeProps = runtimeRootElement.current.runtimeProps

      expect(runtimeProps.props).toMatchObject({
        [DATA_ELEMENT_ID]: rootElement.id,
        key: runtimeRootElement.current.compositeKey,
        ref: expect.any(Function),
      })
    })

    it('should contain element props', () => {
      const { rootElement, runtimeRootElement } =
        rootStore.setupRuntimeElement()

      const runtimeProps = runtimeRootElement.current.runtimeProps

      rootElement.props.set('randomProp', 'RandomPropValue')

      expect(runtimeProps.props).toMatchObject({
        randomProp: 'RandomPropValue',
      })
    })

    it('should contain default props', () => {
      const { rootElement, runtimeRootElement } =
        rootStore.setupRuntimeElement()

      const runtimeProps = runtimeRootElement.current.runtimeProps
      const atom = rootElement.renderType.current
      const fieldKey = 'fieldKey'
      const fieldDefaultValue = '"field-value"'

      const field = rootStore.addField({
        api: atom.api.current,
        defaultValues: fieldDefaultValue,
        fieldType: rootStore.getStringType(),
        key: fieldKey,
      })

      atom.api.current.writeCache({ fields: [field] })

      expect(runtimeProps.props).toMatchObject({
        [fieldKey]: JSON.parse(fieldDefaultValue),
      })
    })
  })

  describe('RuntimeProps.evaluatedProps', () => {
    it.each([
      ['state', IPageKind.Provider],
      ['rootState', IPageKind.Regular],
    ])(
      'should evaluate state field expression with %s in %s',
      (stateKey, pageKind) => {
        // set renderType to builder for state to update when changing field default values
        const { page, renderer, rootElement, runtimeRootElement } =
          rootStore.setupRuntimeElement(RendererType.PageBuilder, pageKind)

        const runtimeProps = runtimeRootElement.current.runtimeProps
        const fieldKey = 'fieldKey'
        const fieldDefaultValue = 'some-value'
        const propKey = 'propKey'
        const store = page.providerPage?.store ?? page.store
        const storeApi = store.current.api.current

        const field = rootStore.addField({
          api: storeApi,
          defaultValues: JSON.stringify(fieldDefaultValue),
          fieldType: rootStore.getStringType(),
          key: fieldKey,
        })

        storeApi.writeCache({ fields: [field] })

        rootElement.props.set(propKey, `{{${stateKey}.${fieldKey}}}`)

        renderer.render()

        expect(runtimeProps.evaluatedProps).toMatchObject({
          [propKey]: fieldDefaultValue,
        })

        field.writeCache({ defaultValues: JSON.stringify('another-value') })

        expect(runtimeProps.evaluatedProps).toMatchObject({
          [propKey]: 'another-value',
        })
      },
    )

    it.each([
      ['actions', IPageKind.Provider],
      ['rootActions', IPageKind.Regular],
    ])(
      'should evaluate action expression with %s in %s',
      (actionsKey, pageKind) => {
        const isProviderPage = pageKind === IPageKind.Provider

        const { page, renderer, rootElement, runtimeRootElement } =
          rootStore.setupRuntimeElement(RendererType.Preview, pageKind)

        const runtimeProps = runtimeRootElement.current.runtimeProps
        const actionName = 'sum'
        const propKey = 'propKey'

        const store = isProviderPage
          ? rootElement.store
          : page.providerPage?.store

        rootStore.addCodeAction({
          code: `function run(a,b){
          return a + b;
        }`,
          name: actionName,
          store,
        })

        rootElement.props.set(propKey, `{{${actionsKey}.${actionName}}}`)

        renderer.render()

        expect(runtimeProps.evaluatedProps).toMatchObject({
          [propKey]: expect.any(Function),
        })

        const actionRunner = runtimeProps.evaluatedProps[propKey]

        expect(actionRunner?.(5, 9)).toBe(14)
      },
    )

    it.each([
      ['actions', IPageKind.Provider],
      ['rootActions', IPageKind.Regular],
    ])('should bind %s with context in %s page', (actionsKey, pageKind) => {
      const { page, renderer, rootElement, runtimeRootElement } =
        rootStore.setupRuntimeElement(RendererType.Preview, pageKind)

      const runtimeProps = runtimeRootElement.current.runtimeProps
      const actionName = 'sum'
      const propKey = 'propKey'

      rootStore.addCodeAction({
        code: `function run(){
          return {
            props,
            state,
            refs,
            actions,
            rootState,
            rootActions,
            rootRefs
          };
        }`,
        name: actionName,
        store: page.providerPage?.store ?? rootElement.store,
      })

      rootElement.props.set(propKey, `{{${actionsKey}.${actionName}}}`)
      renderer.render()

      const actionRunner = runtimeProps.getActionRunner(actionName)

      expect(actionRunner()).toMatchObject({
        [actionsKey]: {
          [actionName]: expect.any(Function),
        },
        props: {
          [propKey]: expect.any(Function),
        },
      })
    })

    it.each([['successAction'], ['errorAction']])(
      'should bind %s with context',
      async (actionField) => {
        const { renderer, rootElement, runtimeRootElement } =
          rootStore.setupRuntimeElement()

        const runtimeProps = runtimeRootElement.current.runtimeProps
        const apiActionName = 'apiAction'
        const codeActionName = 'codeAction'
        const propKey = 'propKey'

        const codeAction = rootStore.addCodeAction({
          code: `function run(response){
          return {
            props,
            state,
            refs,
            actions,
            rootState,
            rootActions,
            rootRefs
          };
        }`,
          name: codeActionName,
          store: rootElement.store,
        })

        configure({ safeDescriptors: false })

        const resource = rootStore.addResource({})

        jest.spyOn(resource, 'client', 'get').mockReturnValue({
          fetch: (config: IResourceFetchConfig) => {
            return Promise.resolve(
              actionField === 'successAction'
                ? {
                    data: {},
                  }
                : { error: 'some error' },
            )
          },
        })

        rootStore.addApiAction({
          [actionField]: {
            __typename: 'CodeAction',
            id: codeAction.id,
          },
          name: apiActionName,
          resource: { id: resource.id },
          store: rootElement.store,
        })

        rootElement.props.set(propKey, `{{actions.${apiActionName}}}`)

        renderer.render()

        const actionRunner = runtimeProps.getActionRunner(apiActionName)

        expect(await actionRunner()).toMatchObject({
          actions: {
            [apiActionName]: expect.any(Function),
            [codeActionName]: expect.any(Function),
          },
          props: {
            [propKey]: expect.any(Function),
          },
        })

        configure({ safeDescriptors: true })
      },
    )

    it.each([['successAction'], ['errorAction']])(
      'should pass response as args to %s',
      async (actionField) => {
        const { rootElement, runtimeRootElement } =
          rootStore.setupRuntimeElement()

        const runtimeProps = runtimeRootElement.current.runtimeProps

        const response =
          actionField === 'successAction'
            ? { data: 35 }
            : { error: 'some error' }

        const apiActionName = 'apiAction'
        const codeActionName = 'successAction'

        const codeAction = rootStore.addCodeAction({
          code: `function run(response){
          return response;
        }`,
          name: codeActionName,
          store: rootElement.store,
        })

        configure({ safeDescriptors: false })

        const resource = rootStore.addResource({})

        jest.spyOn(resource, 'client', 'get').mockReturnValue({
          fetch: (config: IResourceFetchConfig) => {
            return Promise.resolve(response)
          },
        })

        rootStore.addApiAction({
          [actionField]: {
            __typename: 'CodeAction',
            id: codeAction.id,
          },
          name: apiActionName,
          resource: { id: resource.id },
          store: rootElement.store,
        })

        const actionRunner = runtimeProps.getActionRunner(apiActionName)

        expect(await actionRunner()).toMatchObject(response)

        configure({ safeDescriptors: true })
      },
    )

    it.each([
      ['refs', IPageKind.Provider],
      ['rootRefs', IPageKind.Regular],
    ])(
      'should evaluate ref expression with %s in %s',
      async (refsKey, pageKind) => {
        const { rendererService } = rootStore.applicationStore
        const isProviderPage = pageKind === IPageKind.Provider

        const { page, rendered, rootElement, runtimeRootElement } =
          rootStore.setupRuntimeElement(RendererType.Preview, pageKind)

        const runtimeProps = runtimeRootElement.current.runtimeProps
        const propKey = 'propKey'
        const providerRootElement = page.providerPage?.rootElement.current

        const elementRefKey = isProviderPage
          ? rootElement.slug
          : providerRootElement?.slug

        rootElement.props.set(propKey, `{{${refsKey}.${elementRefKey}}}`)

        await act(async () => {
          render(
            createElement(RootStoreProvider, { value: testStore }, rendered),
          )
        })

        expect(runtimeProps.evaluatedProps).toMatchObject({
          [propKey]: undefined,
        })

        await act(async () => {
          const atom = rootStore.addAtom({
            name: 'HtmlSpan',
            type: IAtomType.HtmlSpan,
          })

          const targetElement = isProviderPage
            ? rootElement
            : providerRootElement

          targetElement?.writeCache({
            renderType: atom,
          })

          render(
            createElement(
              RootStoreProvider,
              { value: testStore },
              rendererService.activeRenderer?.current.rendered,
            ),
          )
        })

        expect(runtimeProps.evaluatedProps).toMatchObject({
          [propKey]: {
            current: expect.any(HTMLSpanElement),
          },
        })
      },
    )

    it.each([
      ['state', IPageKind.Provider],
      ['rootState', IPageKind.Regular],
    ])(
      'should re-evaluate prop expression with %s when state is changed via root action in %s',
      (stateKey, pageKind) => {
        const isProviderPage = pageKind === IPageKind.Provider

        const { page, renderer, rootElement, runtimeRootElement } =
          rootStore.setupRuntimeElement(RendererType.Preview, pageKind)

        const runtimeProps = runtimeRootElement.current.runtimeProps
        const actionName = 'rootAction'
        const propKey = 'propKey'
        const rootStateName = 'rootStateName'
        const store = isProviderPage ? page.store : page.providerPage?.store
        const storeApi = store?.current.api.current

        const field = rootStore.addField({
          api: storeApi,
          defaultValues: JSON.stringify('default value'),
          fieldType: rootStore.getStringType(),
          key: rootStateName,
        })

        storeApi?.writeCache({ fields: [field] })

        rootStore.addCodeAction({
          code: `function run() {
            state.${rootStateName} = "something";
          }`,
          name: actionName,
          store,
        })

        rootElement.props.set(propKey, `{{${stateKey}.${rootStateName}}}`)

        renderer.render()

        expect(runtimeProps.evaluatedProps).toMatchObject({
          [propKey]: 'default value',
        })

        const actionRunner = runtimeProps.getActionRunner(actionName)

        actionRunner()

        expect(runtimeProps.evaluatedProps).toMatchObject({
          [propKey]: 'something',
        })
      },
    )

    it('should evaluate component expression', () => {
      const { renderer, runtimeRootElement } = rootStore.setupRuntimeElement()
      const propKey = 'propKey'
      const propValue = 'propValue'

      const component = rootStore.addComponent({
        name: 'component',
      })

      component.props.set(propKey, propValue)
      component.rootElement.current.props.set(
        propKey,
        `{{componentProps.${propKey}}}`,
      )

      runtimeRootElement.current.element.current.writeCache({
        renderType: component,
      })

      renderer.render()

      const runtimeComponent = runtimeRootElement.current.children[0]
        ?.current as IRuntimeComponentModel

      const { runtimeProps } = runtimeComponent.runtimeRootElement.current
      const { evaluatedProps } = runtimeProps

      expect(evaluatedProps).toMatchObject({ [propKey]: propValue })
    })

    it('should evaluate url props expression', () => {
      const urlKey = 'urlKey'
      const urlPropValue = 'urlPropValue'

      rootStore.applicationStore.routerService.setSearchParams({
        [urlKey]: urlPropValue,
      } as NextjsSearchParamsProps)

      const { page, renderer, rootElement, runtimeRootElement } =
        rootStore.setupRuntimeElement()

      rootElement.props.set(urlKey, `{{urlProps.${urlKey}}}`)

      renderer.render()

      expect(
        runtimeRootElement.current.runtimeProps.evaluatedProps,
      ).toMatchObject({
        [urlKey]: urlPropValue,
      })
    })

    it('should handle expression evaluation errors gracefully', () => {
      const { renderer, rootElement, runtimeRootElement } =
        rootStore.setupRuntimeElement()

      const propKey = 'errorProp'
      const invalidExpression = '{{undefined.nonExistent}}'

      rootElement.props.set(propKey, invalidExpression)
      renderer.render()

      // Should return the original expression string when evaluation fails
      expect(
        runtimeRootElement.current.runtimeProps.evaluatedProps,
      ).toMatchObject({
        [propKey]: invalidExpression,
      })
    })
  })
})

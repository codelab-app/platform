import type { IRuntimeComponentModel } from '@codelab/frontend/abstract/application'
import { RendererType } from '@codelab/frontend/abstract/application'
import { DATA_ELEMENT_ID } from '@codelab/frontend/abstract/domain'
import { StoreProvider } from '@codelab/frontend/application/shared/store'
import { createTestApplication } from '@codelab/frontend/application/test'
import type { IResourceFetchConfig } from '@codelab/shared/abstract/core'
import { IAtomType, IPageKind } from '@codelab/shared/abstract/core'
import { render } from '@testing-library/react'
import { configure } from 'mobx'
import React from 'react'

let testApplication: ReturnType<typeof createTestApplication>

describe('Runtime Element props', () => {
  beforeEach(() => {
    testApplication = createTestApplication()
  })

  describe('RuntimeProps.props', () => {
    it('should contain system props', () => {
      const { rootElement, runtimeRootElement } =
        testApplication.setupRuntimeElement()

      const runtimeProps = runtimeRootElement.runtimeProps

      expect(runtimeProps.props).toMatchObject({
        [DATA_ELEMENT_ID]: rootElement.id,
        key: rootElement.id,
        ref: expect.any(Function),
      })
    })

    it('should contain element props', () => {
      const { rootElement, runtimeRootElement } =
        testApplication.setupRuntimeElement()

      const runtimeProps = runtimeRootElement.runtimeProps

      rootElement.props.set('randomProp', 'RandomPropValue')

      expect(runtimeProps.props).toMatchObject({
        randomProp: 'RandomPropValue',
      })
    })

    it('should contain default props', () => {
      const { rootElement, runtimeRootElement } =
        testApplication.setupRuntimeElement()

      const runtimeProps = runtimeRootElement.runtimeProps
      const atom = rootElement.renderType.current
      const fieldKey = 'fieldKey'
      const fieldDefaultValue = '"field-value"'

      const field = testApplication.addField({
        api: atom.api.current,
        defaultValues: fieldDefaultValue,
        fieldType: testApplication.getStringType(),
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
        const { page, rootElement, runtimeRootElement } =
          testApplication.setupRuntimeElement(
            RendererType.PageBuilder,
            pageKind,
          )

        const runtimeProps = runtimeRootElement.runtimeProps
        const fieldKey = 'fieldKey'
        const fieldDefaultValue = 'some-value'
        const propKey = 'propKey'
        const store = page.providerPage?.store ?? page.store
        const storeApi = store.current.api.current

        const field = testApplication.addField({
          api: storeApi,
          defaultValues: JSON.stringify(fieldDefaultValue),
          fieldType: testApplication.getStringType(),
          key: fieldKey,
        })

        storeApi.writeCache({ fields: [field] })

        rootElement.props.set(propKey, `{{${stateKey}.${fieldKey}}}`)

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

        const { page, rootElement, runtimeRootElement } =
          testApplication.setupRuntimeElement(RendererType.Preview, pageKind)

        const runtimeProps = runtimeRootElement.runtimeProps
        const actionName = 'sum'
        const propKey = 'propKey'

        const store = isProviderPage
          ? rootElement.store
          : page.providerPage?.store

        testApplication.addCodeAction({
          code: `function run(a,b){
          return a + b;
        }`,
          name: actionName,
          store,
        })

        rootElement.props.set(propKey, `{{${actionsKey}.${actionName}}}`)

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
      const { page, rootElement, runtimeRootElement } =
        testApplication.setupRuntimeElement(RendererType.Preview, pageKind)

      const runtimeProps = runtimeRootElement.runtimeProps
      const actionName = 'sum'
      const propKey = 'propKey'

      testApplication.addCodeAction({
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
        const { rootElement, runtimeRootElement } =
          testApplication.setupRuntimeElement()

        const runtimeProps = runtimeRootElement.runtimeProps
        const apiActionName = 'apiAction'
        const codeActionName = 'codeAction'
        const propKey = 'propKey'

        const codeAction = testApplication.addCodeAction({
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

        const resource = testApplication.addResource({})

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

        testApplication.addApiAction({
          [actionField]: {
            __typename: 'CodeAction',
            id: codeAction.id,
          },
          name: apiActionName,
          resource: { id: resource.id },
          store: rootElement.store,
        })

        rootElement.props.set(propKey, `{{actions.${apiActionName}}}`)

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
          testApplication.setupRuntimeElement()

        const runtimeProps = runtimeRootElement.runtimeProps

        const response =
          actionField === 'successAction'
            ? { data: 35 }
            : { error: 'some error' }

        const apiActionName = 'apiAction'
        const codeActionName = 'successAction'

        const codeAction = testApplication.addCodeAction({
          code: `function run(response){
          return response;
        }`,
          name: codeActionName,
          store: rootElement.store,
        })

        configure({ safeDescriptors: false })

        const resource = testApplication.addResource({})

        jest.spyOn(resource, 'client', 'get').mockReturnValue({
          fetch: (config: IResourceFetchConfig) => {
            return Promise.resolve(response)
          },
        })

        testApplication.addApiAction({
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
    ])('should evaluate ref expression with %s in %s', (refsKey, pageKind) => {
      const { rendererService } = testApplication.rootStore
      const isProviderPage = pageKind === IPageKind.Provider

      const { page, rendered, rootElement, runtimeRootElement } =
        testApplication.setupRuntimeElement(RendererType.Preview)

      const runtimeProps = runtimeRootElement.runtimeProps
      const propKey = 'propKey'
      const providerRootElement = page.providerPage?.rootElement.current

      const elementRefKey = isProviderPage
        ? rootElement.slug
        : providerRootElement?.slug

      rootElement.props.set(propKey, `{{${refsKey}.${elementRefKey}}}`)

      const { rerender } = render(
        React.createElement(
          StoreProvider,
          { value: testApplication.rootStore },
          rendered,
        ),
      )

      expect(runtimeProps.evaluatedProps).toMatchObject({
        [propKey]: isProviderPage
          ? {
              // eslint-disable-next-line jest/no-conditional-expect
              current: expect.any(HTMLDivElement),
            }
          : undefined,
      })

      const atom = testApplication.addAtom({
        __typename: 'Atom',
        name: 'HtmlSpan',
        type: IAtomType.HtmlSpan,
      })

      const targetElement = isProviderPage ? rootElement : providerRootElement

      targetElement?.writeCache({
        renderType: atom,
      })

      rerender(
        React.createElement(
          StoreProvider,
          { value: testApplication.rootStore },
          rendererService.activeRenderer?.current.render,
        ),
      )

      expect(runtimeProps.evaluatedProps).toMatchObject({
        [propKey]: {
          current: expect.any(HTMLSpanElement),
        },
      })
    })

    it.each([
      ['state', IPageKind.Provider],
      ['rootState', IPageKind.Regular],
    ])(
      'should re-evaluate prop expression with %s when state is changed via root action in %s',
      (stateKey, pageKind) => {
        const isProviderPage = pageKind === IPageKind.Provider

        const { page, rootElement, runtimeRootElement } =
          testApplication.setupRuntimeElement(RendererType.Preview, pageKind)

        const runtimeProps = runtimeRootElement.runtimeProps
        const actionName = 'rootAction'
        const propKey = 'propKey'
        const rootStateName = 'rootStateName'
        const store = isProviderPage ? page.store : page.providerPage?.store
        const storeApi = store?.current.api.current

        const field = testApplication.addField({
          api: storeApi,
          defaultValues: JSON.stringify('default value'),
          fieldType: testApplication.getStringType(),
          key: rootStateName,
        })

        storeApi?.writeCache({ fields: [field] })

        testApplication.addCodeAction({
          code: `function run() {
            state.${rootStateName} = "something";
          }`,
          name: actionName,
          store,
        })

        rootElement.props.set(propKey, `{{${stateKey}.${rootStateName}}}`)

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
      const { runtimeRootElement } = testApplication.setupRuntimeElement()
      const propKey = 'propKey'
      const propValue = 'propValue'

      const component = testApplication.addComponent({
        name: 'component',
      })

      component.props.set(propKey, propValue)
      component.rootElement.current.props.set(
        propKey,
        `{{componentProps.${propKey}}}`,
      )

      runtimeRootElement.element.current.writeCache({
        renderType: component,
      })

      const runtimeComponent = runtimeRootElement
        .children[0] as IRuntimeComponentModel

      const { runtimeProps } = runtimeComponent.runtimeRootElement
      const { evaluatedProps } = runtimeProps

      expect(evaluatedProps).toMatchObject({ [propKey]: propValue })
    })

    it('should evaluate url props expression', () => {
      const urlKey = 'urlKey'
      const urlPropValue = 'urlPropValue'

      testApplication.rootStore.routerService.update({
        query: {
          [urlKey]: urlPropValue,
        },
      })

      const { page, renderer, rootElement, runtimeRootElement } =
        testApplication.setupRuntimeElement()

      rootElement.props.set(urlKey, `{{urlProps.${urlKey}}}`)

      expect(runtimeRootElement.runtimeProps.evaluatedProps).toMatchObject({
        [urlKey]: urlPropValue,
      })
    })
  })

  afterAll(() => {
    testApplication.teardown()
  })
})

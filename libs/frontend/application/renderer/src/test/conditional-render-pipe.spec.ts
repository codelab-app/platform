import {
  type IRootStore,
  rendererRef,
} from '@codelab/frontend/abstract/application'
import {
  DATA_ELEMENT_ID,
  elementTreeRef,
  isAtomRef,
} from '@codelab/frontend/abstract/domain'
import { atomFactory } from '@codelab/frontend/domain/atom'
import { elementFactory } from '@codelab/frontend/domain/element'
import { propFactory } from '@codelab/frontend/domain/prop'
import { interfaceTypeFactory } from '@codelab/frontend/domain/type'
import {
  ConditionalRenderPipe,
  PassThroughRenderPipe,
  renderPipeFactory,
} from '../renderPipes'
import { rendererFactory } from './renderer.test.factory'
import { setupPage } from './setup'
import { rootApplicationStore, rootDomainStore } from './setup/root.test.store'

describe('ConditionalRenderPipe', () => {
  const rootStore = rootDomainStore

  beforeEach(() => {
    rootStore.clear()
  })

  it.each([
    [undefined, true],
    ['{{props.testPropTrue}}', true],
    ['{{props.testPropFalse}}', false],
    ['{{true}}', true],
    ['{{false}}', false],
  ])(
    'should render conditionally with renderIfExpression - expression: %s, should render: %s',
    async (expression, shouldRender) => {
      const { page, rootElement: pageRootElement } = setupPage()

      const element = elementFactory(rootDomainStore)({
        page,
        parentElement: pageRootElement,
        props: propFactory(rootDomainStore)({
          data: '{ "testPropTrue": true, "testPropFalse": false }',
        }).toJson,
        renderIfExpression: expression,
        renderType: atomFactory(rootDomainStore)({
          api: interfaceTypeFactory(rootDomainStore)({}),
        }),
      })

      const elementModel = rootStore.elementDomainService.element(element.id)

      const renderer = rendererFactory(
        rootDomainStore,
        rootApplicationStore,
      )({
        elementTree: elementTreeRef(
          rootDomainStore.appDomainService.app(page.app.id)!.page(page.id)!,
        ).current,
        renderPipe: renderPipeFactory([
          PassThroughRenderPipe,
          ConditionalRenderPipe,
        ]),
      })

      rootApplicationStore.rendererService.setActiveRenderer(
        rendererRef(renderer.id),
      )

      const output =
        rootApplicationStore.rendererService.activeRenderer?.current.renderIntermediateElement(
          elementModel,
        )

      const atomType = isAtomRef(elementModel.renderType)
        ? elementModel.renderType.current.type
        : null

      if (shouldRender) {
        expect(output).toEqual({
          atomType,
          element: elementModel,
          props: expect.objectContaining({
            [DATA_ELEMENT_ID]: elementModel.id,
          }),
        })
      } else {
        expect(output).toEqual({ element: elementModel, shouldRender })
      }
    },
  )
})

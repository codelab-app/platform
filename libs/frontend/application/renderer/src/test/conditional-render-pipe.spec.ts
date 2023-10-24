import type { IRootStore } from '@codelab/frontend/abstract/application'
import {
  DATA_ELEMENT_ID,
  elementTreeRef,
  isAtomRef,
  rendererRef,
} from '@codelab/frontend/abstract/domain'
import {
  ConditionalRenderPipe,
  PassThroughRenderPipe,
  renderPipeFactory,
} from '@codelab/frontend/domain/renderer'
import { setupPage } from './setup'
import { dtoFactory, testRootStore } from './setup/dto.factory'

describe('ConditionalRenderPipe', () => {
  const rootStore = testRootStore as IRootStore

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

      const element = dtoFactory.build('element', {
        page,
        parentElement: pageRootElement,
        props: dtoFactory.build('props', {
          data: '{ "testPropTrue": true, "testPropFalse": false }',
        }).toJson,
        renderIfExpression: expression,
        renderType: dtoFactory.build('atom', {
          api: dtoFactory.build('interfaceType'),
        }),
      })

      const elementModel = rootStore.elementService.element(element.id)

      const renderer = dtoFactory.build('renderer', {
        elementTree: elementTreeRef(
          rootStore.appService.appDomainService
            .app(page.app.id)!
            .page(page.id)!,
        ).current,
        renderPipe: renderPipeFactory([
          PassThroughRenderPipe,
          ConditionalRenderPipe,
        ]),
      })

      rootStore.rendererService.rendererDomainService.setActiveRenderer(
        rendererRef(renderer.id),
      )

      const output =
        rootStore.rendererService.rendererDomainService.activeRenderer?.current.renderIntermediateElement(
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

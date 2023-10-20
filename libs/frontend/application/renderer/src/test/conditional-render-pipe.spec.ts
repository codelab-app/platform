import {
  DATA_ELEMENT_ID,
  elementTreeRef,
  isAtomRef,
  rendererRef,
} from '@codelab/frontend/abstract/domain'
import { ConditionalRenderPipe } from '../renderPipes/conditional-render-pipe'
import { PassThroughRenderPipe } from '../renderPipes/pass-through-render-pipe'
import { renderPipeFactory } from '../renderPipes/render-pipe.factory'
import { factoryBuild } from './factory'
import { rootStore, setupPage } from './setup'

describe('ConditionalRenderPipe', () => {
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

      const element = factoryBuild('element', {
        page,
        parentElement: pageRootElement,
        props: factoryBuild('props', {
          data: '{ "testPropTrue": true, "testPropFalse": false }',
        }),
        renderIfExpression: expression,
        renderType: factoryBuild('atom', {
          api: factoryBuild('typeInterface'),
        }),
      })

      const elementModel = rootStore.elementService.element(element.id)

      const renderer = factoryBuild('renderer', {
        elementTree: elementTreeRef(
          rootStore.pageService.pageDomainService.page(page.id)!,
        ),
        renderPipe: renderPipeFactory([
          PassThroughRenderPipe,
          ConditionalRenderPipe,
        ]),
      })

      rootStore.renderService.setActiveRenderer(rendererRef(renderer.id))

      const output =
        rootStore.renderService.activeRenderer?.current.renderIntermediateElement(
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

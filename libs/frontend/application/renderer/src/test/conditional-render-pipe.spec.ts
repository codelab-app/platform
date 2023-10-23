import { setupPage } from './setup'
import { dtoFactory } from './setup/dto.factory'
import { createTestRootStore } from './setup/test-root-store'

describe('ConditionalRenderPipe', () => {
  const rootStore = createTestRootStore()

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
        }),
        renderIfExpression: expression,
        renderType: dtoFactory.build('atom', {
          api: dtoFactory.build('typeInterface'),
        }),
      })

      const elementModel = rootStore.elementService.element(element.id)

      const renderer = DtoFactory.build('renderer', {
        elementTree: elementTreeRef(
          rootStore.appService.appDomainService
            .app(page.app.id)!
            .page(page.id)!,
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

import type {
  IRendererModel,
  IRenderOutput,
  TypedProp,
} from '@codelab/frontend/abstract/domain'
import {
  CUSTOM_TEXT_PROP_KEY,
  elementTreeRef,
  rendererRef,
  RendererType,
} from '@codelab/frontend/abstract/domain'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import type { IElementDTO, IPageDTO } from '@codelab/shared/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { render } from '@testing-library/react'
import { setupPage } from './setup'
import { dtoFactory } from './setup/dto.factory'
import { createTestRootStore } from './setup/test-root-store'
import { TestProviderWrapper } from './TestProviderWrapper'

describe('TypedPropTransformers', () => {
  const testPropValue = 'some text'
  const testOverridePropValue = 'overridden text'
  const componentId = 'component-id'
  const rootStore = createTestRootStore()
  let page: IPageDTO
  let pageRootElement: IElementDTO
  let renderer: IRendererModel

  beforeEach(() => {
    rootStore.clear()
    ;({ page, rootElement: pageRootElement } = setupPage())

    renderer = dtoFactory.build('renderer', {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      elementTree: elementTreeRef(
        rootStore.appService.appDomainService.apps
          .get(page.app.id)!
          .page(page.id)!,
      ),
      // Passing Preview renderer to replace customText prop value
      rendererType: RendererType.Preview,
    })

    rootStore.rendererService.setActiveRenderer(rendererRef(renderer.id))
  })

  it('should apply default typed prop transformer', () => {
    const integerType = dtoFactory.build('primitiveType', {
      name: PrimitiveTypeKind.Integer,
      primitiveKind: PrimitiveTypeKind.Integer,
    })

    const element = dtoFactory.build('element', {
      page,
      parentElement: pageRootElement,
      props: dtoFactory.build('props', {
        data: JSON.stringify({
          prop01: 'something',
          prop02: false,
          prop03: {
            kind: integerType.kind,
            type: integerType.id,
            value: 123,
          },
        }),
      }),
      renderType: dtoFactory.build('atom', {
        api: dtoFactory.build('interfaceType'),
      }),
    })

    const elementModel = rootStore.elementService.element(element.id)

    const { props } =
      rootStore.rendererService.activeRenderer?.current.renderIntermediateElement(
        elementModel,
      ) as IRenderOutput

    expect(props).toMatchObject({
      prop01: 'something',
      prop02: false,
      prop03: 123,
    })
  })

  it('should render props when kind is ReactNodeType', async () => {
    const componentRootElement = dtoFactory.build('element', {
      closestContainerNode: {
        id: componentId,
      },
      parentComponent: { id: componentId },
      props: dtoFactory.build('props', {
        data: JSON.stringify({
          [CUSTOM_TEXT_PROP_KEY]: testPropValue,
        }),
      }),
      renderType: dtoFactory.build('atom', {
        api: dtoFactory.build('interfaceType'),
        type: IAtomType.AntDesignTypographyText,
      }),
    })

    const component = dtoFactory.build('component', {
      api: dtoFactory.build('interfaceType'),
      childrenContainerElement: componentRootElement,
      id: componentId,
      props: dtoFactory.build('props'),
      rootElement: componentRootElement,
      store: dtoFactory.build('store', {
        api: dtoFactory.build('interfaceType'),
      }),
    })

    const reactNodeType = dtoFactory.build('reactNodeType')

    const element = dtoFactory.build('element', {
      page,
      parentElement: pageRootElement,
      props: dtoFactory.build('props', {
        data: JSON.stringify({
          someNode: {
            kind: reactNodeType.kind,
            type: reactNodeType.id,
            value: component.id,
          } as TypedProp,
        }),
      }),
      renderType: dtoFactory.build('atom', {
        api: dtoFactory.build('interfaceType'),
      }),
    })

    const { props } =
      rootStore.rendererService.activeRenderer?.current.renderIntermediateElement(
        rootStore.elementService.element(element.id),
      ) as IRenderOutput

    const { findByText } = render(props?.['someNode'], {
      wrapper: TestProviderWrapper(rootStore),
    })

    const node = await findByText(testPropValue)

    expect(node).toBeInTheDocument()
  })

  it.each([
    // argument to pass to rendered prop
    [undefined],
    [testOverridePropValue],
  ])(
    'should transform render prop when kind is RenderPropType and render with passed argument - %s',
    async (renderedPropArgument) => {
      const componentRootElement = dtoFactory.build('element', {
        closestContainerNode: {
          id: componentId,
        },
        parentComponent: { id: componentId },
        props: dtoFactory.build('props', {
          data: JSON.stringify({
            [CUSTOM_TEXT_PROP_KEY]: `{{componentProps.${CUSTOM_TEXT_PROP_KEY}}}`,
          }),
        }),
        renderType: dtoFactory.build('atom', {
          api: dtoFactory.build('interfaceType'),
          type: IAtomType.AntDesignTypographyText,
        }),
      })

      const component = dtoFactory.build('component', {
        api: dtoFactory.build('interfaceType'),
        childrenContainerElement: componentRootElement,
        id: componentId,
        props: dtoFactory.build('props', {
          data: JSON.stringify({
            [CUSTOM_TEXT_PROP_KEY]: testPropValue,
          }),
        }),
        rootElement: componentRootElement,
        store: dtoFactory.build('store', {
          api: dtoFactory.build('interfaceType'),
        }),
      })

      const componentApi = await rootStore.typeService.getOne(component.api.id)

      componentApi?.writeCache({
        fields: [
          dtoFactory.build('field', {
            api: componentApi,
            key: CUSTOM_TEXT_PROP_KEY,
            type: dtoFactory.build('primitiveType', {
              name: PrimitiveTypeKind.String,
              primitiveKind: PrimitiveTypeKind.String,
            }),
          }),
        ],
      })

      const renderPropType = dtoFactory.build('renderPropType')

      const element = dtoFactory.build('element', {
        page,
        parentElement: pageRootElement,
        props: dtoFactory.build('props', {
          data: JSON.stringify({
            someNode: {
              kind: renderPropType.kind,
              type: renderPropType.id,
              value: component.id,
            } as TypedProp,
          }),
        }),
        renderType: dtoFactory.build('atom', {
          api: dtoFactory.build('interfaceType'),
        }),
      })

      const { props } =
        rootStore.rendererService.activeRenderer?.current.renderIntermediateElement(
          rootStore.elementService.element(element.id),
        ) as IRenderOutput

      const { findByText } = render(props?.['someNode'](renderedPropArgument), {
        wrapper: TestProviderWrapper(rootStore),
      })

      expect(
        await findByText(renderedPropArgument ?? testPropValue),
      ).toBeInTheDocument()
    },
  )
})

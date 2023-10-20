import type {
  IRenderer,
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
import { factoryBuild } from './factory'
import { rootStore, setupPage } from './setup'
import { TestProviderWrapper } from './TestProviderWrapper'

describe('TypedPropTransformers', () => {
  const testPropValue = 'some text'
  const testOverridePropValue = 'overridden text'
  const componentId = 'component-id'
  let page: IPageDTO
  let pageRootElement: IElementDTO
  let renderer: IRenderer

  beforeEach(() => {
    rootStore.clear()
    ;({ page, rootElement: pageRootElement } = setupPage())
    renderer = factoryBuild('renderer', {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      elementTree: elementTreeRef(
        rootStore.pageService.pageDomainService.page(page.id)!,
      ),
      // Passing Preview renderer to replace customText prop value
      rendererType: RendererType.Preview,
    })

    rootStore.renderService.setActiveRenderer(rendererRef(renderer.id))
  })

  it('should apply default typed prop transformer', () => {
    const integerType = factoryBuild('typePrimitive', {
      name: PrimitiveTypeKind.Integer,
      primitiveKind: PrimitiveTypeKind.Integer,
    })

    const element = factoryBuild('element', {
      page,
      parentElement: pageRootElement,
      props: factoryBuild('props', {
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
      renderType: factoryBuild('atom', {
        api: factoryBuild('typeInterface'),
      }),
    })

    const elementModel = rootStore.elementService.element(element.id)

    const { props } =
      rootStore.renderService.activeRenderer?.current.renderIntermediateElement(
        elementModel,
      ) as IRenderOutput

    expect(props).toMatchObject({
      prop01: 'something',
      prop02: false,
      prop03: 123,
    })
  })

  it('should render props when kind is ReactNodeType', async () => {
    const componentRootElement = factoryBuild('element', {
      closestContainerNode: {
        id: componentId,
      },
      parentComponent: { id: componentId },
      props: factoryBuild('props', {
        data: JSON.stringify({
          [CUSTOM_TEXT_PROP_KEY]: testPropValue,
        }),
      }),
      renderType: factoryBuild('atom', {
        api: factoryBuild('typeInterface'),
        type: IAtomType.Text,
      }),
    })

    const component = factoryBuild('component', {
      api: factoryBuild('typeInterface'),
      childrenContainerElement: componentRootElement,
      id: componentId,
      props: factoryBuild('props'),
      rootElement: componentRootElement,
      store: factoryBuild('store', {
        api: factoryBuild('typeInterface'),
      }),
    })

    const reactNodeType = factoryBuild('typeReactNode')

    const element = factoryBuild('element', {
      page,
      parentElement: pageRootElement,
      props: factoryBuild('props', {
        data: JSON.stringify({
          someNode: {
            kind: reactNodeType.kind,
            type: reactNodeType.id,
            value: component.id,
          } as TypedProp,
        }),
      }),
      renderType: factoryBuild('atom', {
        api: factoryBuild('typeInterface'),
      }),
    })

    const { props } =
      rootStore.renderService.activeRenderer?.current.renderIntermediateElement(
        rootStore.elementService.element(element.id),
      ) as IRenderOutput

    const { findByText } = render(props?.['someNode'], {
      wrapper: TestProviderWrapper(rootStore),
    })

    expect(await findByText(testPropValue)).toBeInTheDocument()
  })

  it.each([
    // argument to pass to rendered prop
    [undefined],
    [testOverridePropValue],
  ])(
    'should transform render prop when kind is RenderPropType and render with passed argument - %s',
    async (renderedPropArgument) => {
      const componentRootElement = factoryBuild('element', {
        closestContainerNode: {
          id: componentId,
        },
        parentComponent: { id: componentId },
        props: factoryBuild('props', {
          data: JSON.stringify({
            [CUSTOM_TEXT_PROP_KEY]: `{{componentProps.${CUSTOM_TEXT_PROP_KEY}}}`,
          }),
        }),
        renderType: factoryBuild('atom', {
          api: factoryBuild('typeInterface'),
          type: IAtomType.Text,
        }),
      })

      const component = factoryBuild('component', {
        api: factoryBuild('typeInterface'),
        childrenContainerElement: componentRootElement,
        id: componentId,
        props: factoryBuild('props', {
          data: JSON.stringify({
            [CUSTOM_TEXT_PROP_KEY]: testPropValue,
          }),
        }),
        rootElement: componentRootElement,
        store: factoryBuild('store', {
          api: factoryBuild('typeInterface'),
        }),
      })

      const componentApi = await rootStore.typeService.getOne(component.api.id)

      componentApi?.writeCache({
        fields: [
          factoryBuild('field', {
            api: componentApi,
            key: CUSTOM_TEXT_PROP_KEY,
            type: factoryBuild('typePrimitive', {
              name: PrimitiveTypeKind.String,
              primitiveKind: PrimitiveTypeKind.String,
            }),
          }),
        ],
      })

      const renderPropType = factoryBuild('typeRenderProp')

      const element = factoryBuild('element', {
        page,
        parentElement: pageRootElement,
        props: factoryBuild('props', {
          data: JSON.stringify({
            someNode: {
              kind: renderPropType.kind,
              type: renderPropType.id,
              value: component.id,
            } as TypedProp,
          }),
        }),
        renderType: factoryBuild('atom', {
          api: factoryBuild('typeInterface'),
        }),
      })

      const { props } =
        rootStore.renderService.activeRenderer?.current.renderIntermediateElement(
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

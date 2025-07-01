import {
  IRuntimeNodeType,
  RendererType,
} from '@codelab/frontend-abstract-application'
import { createTestStore } from '@codelab/frontend-infra-mobx-store'
import { IAtomType, IPageKind } from '@codelab/shared-abstract-core'
import { v4 } from 'uuid'

describe('TreeViewNode', () => {
  let testStore: ReturnType<typeof createTestStore>['rootStore']

  beforeEach(() => {
    testStore = createTestStore().rootStore
  })

  afterEach(() => {
    testStore.teardown()
  })

  it('should contain root element as the first node', () => {
    const { page, renderer, runtimePage } = testStore.setupPage(
      RendererType.PageBuilder,
      IPageKind.Regular,
    )

    const rootElement = page.rootElement
    const runtimeRootElement = runtimePage?.runtimeRootElement

    expect(renderer.runtimeContainerNode.treeViewNode).toMatchObject({
      element: { id: rootElement.id },
      key: runtimeRootElement?.current.compositeKey,
    })
  })

  it('should contain component as the first node', () => {
    const { component, renderer, runtimeComponent } = testStore.setupComponent()

    expect(renderer.runtimeContainerNode.treeViewNode).toMatchObject({
      component: { id: component.id },
      key: runtimeComponent?.compositeKey,
    })
  })

  it('should contain root element as a child', () => {
    const { component, renderer, runtimeComponent } = testStore.setupComponent()

    expect(
      renderer.runtimeContainerNode.treeViewNode.children[0],
    ).toMatchObject({
      element: { id: component.rootElement.id },
      key: runtimeComponent?.runtimeRootElement.current.compositeKey,
    })
  })

  it('should contain child element', () => {
    const { page, renderer, runtimePage } = testStore.setupPage(
      RendererType.PageBuilder,
      IPageKind.Regular,
    )

    const rootElement = page.rootElement.current

    const childElement = testStore.addElement({
      parentElement: rootElement,
      renderType: testStore.getAtomByType(IAtomType.HtmlDiv),
    })

    childElement.attachAsFirstChild(rootElement)

    renderer.render()

    const runtimeChildElement =
      runtimePage?.runtimeRootElement.current.children[0]

    const node = renderer.runtimeContainerNode.treeViewNode.children[0]

    expect(node).toMatchObject({
      element: { id: childElement.id },
      key: runtimeChildElement?.current.compositeKey,
      type: IRuntimeNodeType.Element,
    })
  })

  it('should have runtime page key as rootKey', () => {
    const { page, renderer, runtimePage } = testStore.setupPage(
      RendererType.PageBuilder,
      IPageKind.Regular,
    )

    const rootElement = page.rootElement.current

    const childElement = testStore.addElement({
      parentElement: rootElement,
      renderType: testStore.getAtomByType(IAtomType.HtmlDiv),
    })

    childElement.attachAsFirstChild(rootElement)

    renderer.render()

    expect(runtimePage?.runtimeRootElement.current.treeViewNode).toMatchObject({
      rootKey: runtimePage?.compositeKey,
    })

    expect(
      renderer.runtimeContainerNode.treeViewNode.children[0],
    ).toMatchObject({ rootKey: runtimePage?.compositeKey })
  })

  it('should contain atom meta for elements with atom', () => {
    const { page, renderer } = testStore.setupPage(
      RendererType.PageBuilder,
      IPageKind.Regular,
    )

    const rootElement = page.rootElement.current

    expect(renderer.runtimeContainerNode.treeViewNode).toMatchObject({
      atomMeta: rootElement.atomName,
      componentMeta: undefined,
      element: { id: rootElement.id },
      type: IRuntimeNodeType.Element,
    })
  })

  it('should contain component meta for instance element', () => {
    const { page, renderer } = testStore.setupPage(
      RendererType.PageBuilder,
      IPageKind.Regular,
    )

    const componentName = 'Component 01'
    const rootElement = page.rootElement.current

    const component = testStore.addComponent({
      name: componentName,
    })

    const instanceElement = testStore.addElement({
      parentElement: rootElement,
      renderType: component,
    })

    instanceElement.attachAsFirstChild(rootElement)
    renderer.render()

    const node = renderer.runtimeContainerNode.treeViewNode.children[0]

    expect(node).toMatchObject({
      atomMeta: undefined,
      componentMeta: `instance of ${componentName}`,
      element: { id: instanceElement.id },
      type: IRuntimeNodeType.Element,
    })
  })

  it('should hide component tree node in instance element children', () => {
    const { page, renderer } = testStore.setupPage(
      RendererType.PageBuilder,
      IPageKind.Regular,
    )

    const componentName = 'Component 01'
    const rootElement = page.rootElement.current

    const component = testStore.addComponent({
      name: componentName,
      rootElement,
    })

    const instanceElement = testStore.addElement({
      parentElement: rootElement,
      renderType: component,
    })

    instanceElement.attachAsFirstChild(rootElement)
    renderer.render()

    const node = renderer.runtimeContainerNode.treeViewNode.children[0]

    expect(node).toMatchObject({
      children: [],
      element: { id: instanceElement.id },
      type: IRuntimeNodeType.Element,
    })
  })

  it('should show instance element children even when not rendered', () => {
    const { page, renderer } = testStore.setupPage(
      RendererType.PageBuilder,
      IPageKind.Regular,
    )

    const componentName = 'Component 01'
    const rootElement = page.rootElement.current

    const component = testStore.addComponent({
      name: componentName,
      rootElement,
    })

    const instanceElement = testStore.addElement({
      parentElement: rootElement,
      renderType: component,
    })

    const htmlDiv = testStore.getAtomByType(IAtomType.HtmlDiv)

    const instanceElementChild = testStore.addElement({
      parentElement: instanceElement,
      renderType: htmlDiv,
    })

    const secondChild = testStore.addElement({
      prevSibling: instanceElementChild,
      renderType: htmlDiv,
    })

    const thirdChild = testStore.addElement({
      prevSibling: secondChild,
      renderType: htmlDiv,
    })

    const fourthChild = testStore.addElement({
      prevSibling: thirdChild,
      renderType: htmlDiv,
    })

    instanceElement.attachAsFirstChild(rootElement)
    instanceElementChild.attachAsFirstChild(instanceElement)

    renderer.render()

    const rootElementTreeNode = renderer.runtimeContainerNode.treeViewNode
    const instanceTreeNodeChild = rootElementTreeNode.children[0]?.children[0]

    expect(instanceTreeNodeChild).toMatchObject({
      element: { id: instanceElementChild.id },
      type: IRuntimeNodeType.Element,
    })
  })

  it('should show child mapper components', () => {
    const { page, renderer, runtimePage } = testStore.setupPage(
      RendererType.PageBuilder,
      IPageKind.Regular,
    )

    const propKey = 'propKey'
    const propValue = ['a', 'b', 'c', 'd']
    const componentName = 'Component 01'
    const rootElement = page.rootElement.current

    const component = testStore.addComponent({
      name: componentName,
      rootElement,
    })

    rootElement.writeCache({
      childMapperComponent: component,
      childMapperPropKey: `{{props.${propKey}}}`,
      props: {
        data: JSON.stringify({ [propKey]: propValue }),
        id: v4(),
      },
    })

    renderer.render()

    const node = runtimePage?.treeViewNode

    expect(node?.children.length).toBe(propValue.length)

    node?.children.forEach((child, index) => {
      expect(child).toMatchObject({
        primaryTitle: `${component.name} ${index}`,
        selectable: false,
      })
    })
  })
})

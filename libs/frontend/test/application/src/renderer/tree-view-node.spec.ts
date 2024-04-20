import {
  IRuntimeNodeType,
  RendererType,
} from '@codelab/frontend/abstract/application'
import { IPageKind } from '@codelab/shared/abstract/core'
import { unregisterRootStore } from 'mobx-keystone'
import { v4 } from 'uuid'
import { rootApplicationStore } from '../../../../application/test/src/root.test.store'
import { TestBed } from '../../../../application/test/src/test-bed'

let testBed: TestBed

describe('TreeViewNode', () => {
  beforeEach(() => {
    testBed = TestBed.Create()
  })

  it('should contain root element as the first node', () => {
    const { page, renderer, runtimePage } = testBed.setupPage(
      RendererType.PageBuilder,
      IPageKind.Regular,
    )

    const rootElement = page.rootElement
    const runtimeRootElement = runtimePage?.runtimeRootElement

    expect(renderer.runtimeContainerNode?.treeViewNode).toMatchObject({
      element: { id: rootElement.id },
      key: runtimeRootElement?.compositeKey,
    })
  })

  it('should contain component as the first node', () => {
    const { component, renderer, runtimeComponent } = testBed.setupComponent()

    expect(renderer.runtimeContainerNode?.treeViewNode).toMatchObject({
      component: { id: component.id },
      key: runtimeComponent.compositeKey,
    })
  })

  it('should contain root element as a child', () => {
    const { component, renderer, runtimeComponent } = testBed.setupComponent()

    expect(
      renderer.runtimeContainerNode?.treeViewNode.children[0],
    ).toMatchObject({
      element: { id: component.rootElement.id },
      key: runtimeComponent.runtimeRootElement.compositeKey,
    })
  })

  it('should contain child element', () => {
    const { page, renderer, runtimePage } = testBed.setupPage(
      RendererType.PageBuilder,
      IPageKind.Regular,
    )

    const rootElement = page.rootElement.current

    const childElement = testBed.addElement({
      parentElement: rootElement,
      renderType: testBed.getDivAtom(),
    })

    childElement.attachAsFirstChild(rootElement)

    const runtimeChildElement = runtimePage?.runtimeRootElement.children[0]
    const node = renderer.runtimeContainerNode?.treeViewNode.children[0]

    expect(node).toMatchObject({
      element: { id: childElement.id },
      key: runtimeChildElement?.compositeKey,
      type: IRuntimeNodeType.Element,
    })
  })

  it('should have runtime page key as rootKey', () => {
    const { page, renderer, runtimePage } = testBed.setupPage(
      RendererType.PageBuilder,
      IPageKind.Regular,
    )

    const rootElement = page.rootElement.current

    const childElement = testBed.addElement({
      parentElement: rootElement,
      renderType: testBed.getDivAtom(),
    })

    childElement.attachAsFirstChild(rootElement)

    expect(runtimePage?.runtimeRootElement.treeViewNode).toMatchObject({
      rootKey: runtimePage?.compositeKey,
    })

    expect(
      renderer.runtimeContainerNode?.treeViewNode.children[0],
    ).toMatchObject({ rootKey: runtimePage?.compositeKey })
  })

  it('should contain atom meta for elements with atom', () => {
    const { page, renderer } = testBed.setupPage(
      RendererType.PageBuilder,
      IPageKind.Regular,
    )

    const rootElement = page.rootElement.current

    expect(renderer.runtimeContainerNode?.treeViewNode).toMatchObject({
      atomMeta: rootElement.atomName,
      componentMeta: undefined,
      element: { id: rootElement.id },
      type: IRuntimeNodeType.Element,
    })
  })

  it('should contain component meta for instance element', () => {
    const { page, renderer } = testBed.setupPage(
      RendererType.PageBuilder,
      IPageKind.Regular,
    )

    const componentName = 'Component 01'
    const rootElement = page.rootElement.current

    const component = testBed.addComponent({
      name: componentName,
    })

    const instanceElement = testBed.addElement({
      parentElement: rootElement,
      renderType: component,
    })

    instanceElement.attachAsFirstChild(rootElement)

    const node = renderer.runtimeContainerNode?.treeViewNode.children[0]

    expect(node).toMatchObject({
      atomMeta: undefined,
      componentMeta: `instance of ${componentName}`,
      element: { id: instanceElement.id },
      type: IRuntimeNodeType.Element,
    })
  })

  it('should hide component tree node in instance element children', () => {
    const { page, renderer } = testBed.setupPage(
      RendererType.PageBuilder,
      IPageKind.Regular,
    )

    const componentName = 'Component 01'
    const rootElement = page.rootElement.current

    const component = testBed.addComponent({
      name: componentName,
      rootElement,
    })

    const instanceElement = testBed.addElement({
      parentElement: rootElement,
      renderType: component,
    })

    instanceElement.attachAsFirstChild(rootElement)

    const node = renderer.runtimeContainerNode?.treeViewNode.children[0]

    expect(node).toMatchObject({
      children: [],
      element: { id: instanceElement.id },
      type: IRuntimeNodeType.Element,
    })
  })

  it('should show instance element children even when not rendered', () => {
    const { page, renderer } = testBed.setupPage(
      RendererType.PageBuilder,
      IPageKind.Regular,
    )

    const componentName = 'Component 01'
    const rootElement = page.rootElement.current

    const component = testBed.addComponent({
      name: componentName,
      rootElement,
    })

    const instanceElement = testBed.addElement({
      parentElement: rootElement,
      renderType: component,
    })

    const instanceElementChild = testBed.addElement({
      parentElement: instanceElement,
      renderType: testBed.getDivAtom(),
    })

    const secondChild = testBed.addElement({
      prevSibling: instanceElementChild,
      renderType: testBed.getDivAtom(),
    })

    const thirdChild = testBed.addElement({
      prevSibling: secondChild,
      renderType: testBed.getDivAtom(),
    })

    const fourthChild = testBed.addElement({
      prevSibling: thirdChild,
      renderType: testBed.getDivAtom(),
    })

    instanceElement.attachAsFirstChild(rootElement)
    instanceElementChild.attachAsFirstChild(instanceElement)

    const rootElementTreeNode = renderer.runtimeContainerNode?.treeViewNode
    const instanceTreeNodeChild = rootElementTreeNode?.children[0]?.children[0]

    expect(instanceTreeNodeChild).toMatchObject({
      element: { id: instanceElementChild.id },
      type: IRuntimeNodeType.Element,
    })
  })

  it('should show child mapper components', () => {
    const { page, runtimePage } = testBed.setupPage(
      RendererType.PageBuilder,
      IPageKind.Regular,
    )

    const propKey = 'propKey'
    const propValue = ['a', 'b', 'c', 'd']
    const componentName = 'Component 01'
    const rootElement = page.rootElement.current

    const component = testBed.addComponent({
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

    const node = runtimePage?.treeViewNode

    expect(node?.children.length).toBe(propValue.length)

    node?.children.forEach((child, index) => {
      expect(child).toMatchObject({
        primaryTitle: `${component.name} ${index}`,
        selectable: false,
      })
    })
  })

  afterAll(() => {
    unregisterRootStore(rootApplicationStore)
  })
})

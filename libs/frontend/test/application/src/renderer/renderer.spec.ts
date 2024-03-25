import { RendererType } from '@codelab/frontend/abstract/application'
import { IPageKind } from '@codelab/shared/abstract/core'
import { unregisterRootStore } from 'mobx-keystone'
import { setupComponent, setupPages } from './setup'
import { rootApplicationStore } from './setup/root.test.store'
import { TestBed } from './setup/testbed'

let testbed: TestBed

describe('Renderer', () => {
  beforeEach(() => {
    rootApplicationStore.clear()
    testbed = new TestBed()
  })

  it('should create page runtime nodes', () => {
    const { page, runtimePage, runtimeProviderPage } = setupPages(
      testbed,
      RendererType.Preview,
      IPageKind.Regular,
    )

    // Test the creation of provider page node
    expect(runtimeProviderPage?.page.id).toBe(page.providerPage?.id)

    // Test the creation of page node
    expect(runtimePage?.page.id).toBe(page.id)
  })

  it('should create component runtime node', () => {
    const { component, renderer } = setupComponent(testbed)

    expect(renderer.runtimeComponent?.component.id).toBe(component.id)
  })

  afterAll(() => {
    unregisterRootStore(rootApplicationStore)
  })
})

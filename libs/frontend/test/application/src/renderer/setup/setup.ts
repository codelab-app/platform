import { RendererType } from '@codelab/frontend/abstract/application'
import { Store } from '@codelab/frontend/domain/store'
import {
  IAtomType,
  IElementRenderTypeKind,
  IPageKind,
} from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { v4 } from 'uuid'
import type { TestBed } from './testbed'

export const setupRuntimeElement = (
  testBed: TestBed,
  rendererType: RendererType = RendererType.Preview,
  pageKind: IPageKind = IPageKind.Regular,
) => {
  const { page, rendered, renderer, runtimePage } = testBed.setupPage(
    rendererType,
    pageKind,
  )

  const runtimeElement = runtimePage!.runtimeRootElement

  return {
    element: page.rootElement.current,
    page,
    rendered,
    renderer,
    runtimeElement,
  }
}

import type { IRendererModel } from '@codelab/frontend/abstract/application'
import type { IPageModel } from '@codelab/frontend/abstract/domain'
import type { IPropData } from '@codelab/shared/abstract/core'
import type { ObjectLike } from '@codelab/shared/abstract/types'

import {
  NewRoutePaths,
  RendererType,
} from '@codelab/frontend/abstract/application'
import { IAtomType } from '@codelab/shared/abstract/core'
import { match } from 'path-to-regexp'
import { isNullish } from 'remeda'

export const useOverrideAtomProps = (
  renderer: IRendererModel,
  props: IPropData,
  atomType?: IAtomType,
): IPropData => {
  const inPreviewMode = RendererType.Preview === renderer.rendererType
  const inBuilderMode = renderer.isBuilder
  const builderOverrideProps: IPropData = {}
  const isHtmlLinkTag = atomType === IAtomType.HtmlLink

  // Disables any in-app navigation in builder mode
  // (except resources, e.g. fonts, that are loaded as <link href="..." />)
  if (inBuilderMode && !isNullish(props['href']) && !isHtmlLinkTag) {
    builderOverrideProps['href'] = '#'
  }

  if (inPreviewMode && !isNullish(props['href']) && !isHtmlLinkTag) {
    const rendererPage = renderer.runtimePage?.page.maybeCurrent
    const app = rendererPage?.app.maybeCurrent
    const pages = app?.pages ?? []
    const appId = app?.id

    const { pageId, query } = extractPathParamsFromUrl(
      pages.map((page) => page.current),
      props['href'],
    )

    if (pageId && appId) {
      const href = NewRoutePaths.Page.base({ appId, pageId })
      const searchParams = new URLSearchParams(query)

      builderOverrideProps['href'] = `${href}?${searchParams}`
    }
  }

  // Only allows editing of grid layout in preview mode
  if (atomType === IAtomType.GridLayout) {
    builderOverrideProps['static'] = !inBuilderMode
  }

  return builderOverrideProps
}

export const extractPathParamsFromUrl = (
  pages: Array<Pick<IPageModel, 'id' | 'urlPattern'>>,
  url: string,
) => {
  for (const page of pages) {
    const urlMatch = match<ObjectLike>(page.urlPattern, {
      decode: decodeURIComponent,
    })

    const results = urlMatch(url)

    if (results) {
      return { pageId: page.id, query: results.params }
    }
  }

  return { pageId: null, query: {} }
}

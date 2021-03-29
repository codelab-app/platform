import React from 'react'
import {
  StyleContainerCreate,
  StyleContainerUpdateDelete,
  useStylesPane,
} from '@codelab/modules/style'
import { BuilderPaneController } from '../Builder-pane-controller'
import { LambdaPaneDetail } from '@codelab/modules/lambda'
import { PageDetailPane } from '@codelab/modules/page'
import { LayoutTab } from '@codelab/frontend/layout'

export const BuilderDetails = () => {
  const { detailStyleId } = useStylesPane()

  return (
    <>
      <BuilderPaneController isRendered={({ tab }) => tab === LayoutTab.Page}>
        <PageDetailPane />
      </BuilderPaneController>
      <BuilderPaneController isRendered={({ tab }) => tab === LayoutTab.Styles}>
        {detailStyleId ? (
          <StyleContainerUpdateDelete />
        ) : (
          <StyleContainerCreate />
        )}
      </BuilderPaneController>
      <BuilderPaneController
        isRendered={({ tab }) => tab === LayoutTab.Function}
      >
        <LambdaPaneDetail />
      </BuilderPaneController>
    </>
  )
}

import { Button } from 'antd'
import React from 'react'
import { CreateLambdaForm } from '../createLambda/CreateLambdaForm'
import { PaneDetailTemplate } from 'apps/web/src/templates/Pane-detail--template'
import {
  LayoutPaneVisibility,
  useLayout,
} from 'apps/web/src/templates/layout-state'

export const LambdaPaneDetail = () => {
  const { setPaneVisibility } = useLayout()

  return (
    <PaneDetailTemplate
      header={
        <>
          <Button
            type="primary"
            onClick={() => setPaneVisibility(LayoutPaneVisibility.Main)}
          >
            Close
          </Button>
        </>
      }
    >
      <CreateLambdaForm />
    </PaneDetailTemplate>
  )
}

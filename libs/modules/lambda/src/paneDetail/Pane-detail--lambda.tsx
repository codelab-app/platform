import { Button } from 'antd'
import React from 'react'
import { CreateLambdaForm } from '../createLambda/CreateLambdaForm'
import {
  LayoutPaneVisibility,
  PaneDetailTemplate,
  useLayout,
} from '@codelab/frontend/layout'

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

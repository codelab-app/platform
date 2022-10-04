import { ExplorerPaneTemplate } from '@codelab/frontend/view/templates'
import React from 'react'
import {
  CreateLambdaButton,
  CreateLambdaModal,
  GetLambdasTable,
  UpdateLambdaModal,
} from './use-cases'

export const ExplorerPaneLambda = () => {
  return (
    <ExplorerPaneTemplate
      header={<CreateLambdaButton key={1} />}
      title="Lambda"
    >
      <GetLambdasTable />
      <CreateLambdaModal />
      <UpdateLambdaModal />
    </ExplorerPaneTemplate>
  )
}

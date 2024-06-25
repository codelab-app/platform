import { ExplorerPaneTemplate } from '@codelab/frontend-presentation-view/templates'
import React from 'react'
import {
  CreateLambdaButton,
  CreateLambdaModal,
} from '../use-cases/create-lambda'
import { GetLambdasTable } from '../use-cases/get-lambdas'
import { UpdateLambdaModal } from '../use-cases/update-lambda'

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

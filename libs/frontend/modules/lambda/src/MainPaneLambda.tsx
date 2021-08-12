import { MainPaneTemplate } from '@codelab/frontend/view/templates'
import React from 'react'
import {
  CreateLambdaButton,
  CreateLambdaModal,
} from './use-cases/create-lambda'
import { GetLambdasTable } from './use-cases/get-lambdas'
import { UpdateLambdaModal } from './use-cases/update-lambda'

export const MainPaneLambda = () => {
  return (
    <MainPaneTemplate title="Lambda" header={<CreateLambdaButton key={1} />}>
      <GetLambdasTable />
      <CreateLambdaModal />
      <UpdateLambdaModal />
    </MainPaneTemplate>
  )
}

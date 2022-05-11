import { MainPaneTemplate } from '@codelab/frontend/view/templates'
import React from 'react'
import {
  CreateLambdaButton,
  CreateLambdaModal,
  GetLambdasTable,
  UpdateLambdaModal,
} from './use-cases'

export const MainPaneLambda = () => {
  return (
    <MainPaneTemplate
      header={() => <CreateLambdaButton key={1} />}
      title="Lambda"
    >
      <GetLambdasTable />
      <CreateLambdaModal />
      <UpdateLambdaModal />
    </MainPaneTemplate>
  )
}

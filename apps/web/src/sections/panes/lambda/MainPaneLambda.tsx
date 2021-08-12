import {
  CreateLambdaButton,
  CreateLambdaModal,
  GetLambdasTable,
  UpdateLambdaModal,
} from '@codelab/frontend/modules/lambda'
import { MainPaneTemplate } from '@codelab/frontend/view/templates'
import React from 'react'

export const MainPaneLambda = () => {
  return (
    <MainPaneTemplate title="Lambda" header={<CreateLambdaButton key={1} />}>
      <GetLambdasTable />
      <CreateLambdaModal />
      <UpdateLambdaModal />
    </MainPaneTemplate>
  )
}

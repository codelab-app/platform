import {
  CreateLambdaButton,
  CreateLambdaModal,
  GetLambdasTable,
  UpdateLambdaModal,
} from '@codelab/modules/lambda'
import React from 'react'
import { MainPaneTemplate } from '../paneTemplates'

export const MainPaneLambda = () => {
  return (
    <MainPaneTemplate title="Lambda" header={<CreateLambdaButton key={1} />}>
      <GetLambdasTable />
      <CreateLambdaModal />
      <UpdateLambdaModal />
    </MainPaneTemplate>
  )
}

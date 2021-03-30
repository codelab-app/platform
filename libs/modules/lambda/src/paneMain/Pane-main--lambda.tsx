import React from 'react'
import { CreateLambdaModal } from '../createLambda'
import { GetLambdasTable } from '../getLambdas'
import { UpdateLambdaModal } from '../updateLambda'
import { PaneMainTemplate } from '@codelab/frontend/layout'
import { CreateLambdaButton } from '../createLambda/CreateLambdaButton'

export const PaneMainLambda = () => {
  return (
    <PaneMainTemplate title="Lambda" header={<CreateLambdaButton key={1} />}>
      <GetLambdasTable />
      <CreateLambdaModal />
      <UpdateLambdaModal />
    </PaneMainTemplate>
  )
}

import { PaneMainTemplate } from '@codelab/frontend/layout'
import React from 'react'
import { CreateLambdaModal } from '../createLambda'
import { CreateLambdaButton } from '../createLambda/CreateLambdaButton'
import { GetLambdasTable } from '../getLambdas'
import { UpdateLambdaModal } from '../updateLambda'

export const PaneMainLambda = () => {
  return (
    <PaneMainTemplate title="Lambda" header={<CreateLambdaButton key={1} />}>
      <GetLambdasTable />
      <CreateLambdaModal />
      <UpdateLambdaModal />
    </PaneMainTemplate>
  )
}

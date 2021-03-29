import React from 'react'
import { CreateLambdaModal } from '../createLambda/CreateLambdaModal'
import { GetLambdasTable } from '../getLambdas/GetLambdasTable'
import { UpdateLambdaModal } from '../updateLambda/UpdateLambdaModal'
import { PaneMainTemplate } from '@codelab/frontend/layout'
import { CreateLambdaButton } from '../createLambda/CreateLambdaButton'

export const PaneMainLambda = () => {
  return (
    <PaneMainTemplate
      title="Lambda"
      header={
        <>
          <CreateLambdaButton />
        </>
      }
    >
      <GetLambdasTable />
      <CreateLambdaModal />
      <UpdateLambdaModal />
    </PaneMainTemplate>
  )
}

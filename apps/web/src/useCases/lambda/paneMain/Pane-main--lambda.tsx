import React from 'react'
import { CreateLambdaModal } from '../createLambda/CreateLambdaModal'
import { GetLambdasTable } from '../getLambdas/GetLambdasTable'
import { UpdateLambdaModal } from '../updateLambda/UpdateLambdaModal'
import { PaneMainTemplate } from 'apps/web/src/templates/Pane-main--template'
import { CreateLambdaButton } from 'apps/web/src/useCases/lambda/createLambda/CreateLambdaButton'

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

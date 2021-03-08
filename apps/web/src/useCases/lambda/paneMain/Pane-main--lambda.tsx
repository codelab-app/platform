import React from 'react'
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
      {/* <GetLambdasTable />
      <CreateLambdaModal />
      <UpdateLambdaModal /> */}
    </PaneMainTemplate>
  )
}

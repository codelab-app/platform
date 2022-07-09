import {
  RESOURCE_SERVICE,
  USER_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { ExplorerPaneTemplate } from '@codelab/frontend/view/templates'
import { observer } from 'mobx-react-lite'
import React from 'next/router'
import {
  CreateResourceButton,
  CreateResourceModal,
  DeleteResourceModal,
  GetResourcesList,
  UpdateResourceModal,
} from '../use-cases'

export const ExplorerPaneResource = observer<
  WithServices<RESOURCE_SERVICE | USER_SERVICE>
>(({ resourceService, userService }) => {
  return (
    <ExplorerPaneTemplate
      header={
        <CreateResourceButton key={0} resourceService={resourceService} />
      }
      title="Resources"
    >
      <GetResourcesList resourceService={resourceService} />
      <CreateResourceModal
        resourceService={resourceService}
        userService={userService}
      />
      <UpdateResourceModal resourceService={resourceService} />
      <DeleteResourceModal resourceService={resourceService} />
    </ExplorerPaneTemplate>
  )
})

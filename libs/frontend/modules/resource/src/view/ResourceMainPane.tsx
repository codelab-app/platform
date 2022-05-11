import { RESOURCE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { MainPaneTemplate } from '@codelab/frontend/view/templates'
import { observer } from 'mobx-react-lite'
import React from 'next/router'
import {
  CreateResourceButton,
  CreateResourceModal,
  DeleteResourcesModal,
  GetResourcesList,
  UpdateResourceModal,
} from '../use-cases'

export const ResourceMainPane = observer<WithServices<RESOURCE_SERVICE>>(
  ({ resourceService }) => (
    <MainPaneTemplate
      header={() => (
        <CreateResourceButton key={0} resourceService={resourceService} />
      )}
      title="Resources"
    >
      <GetResourcesList resourceService={resourceService} />
      <CreateResourceModal resourceService={resourceService} />
      <UpdateResourceModal resourceService={resourceService} />
      <DeleteResourcesModal resourceService={resourceService} />
    </MainPaneTemplate>
  ),
)

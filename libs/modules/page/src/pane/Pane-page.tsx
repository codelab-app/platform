import React from 'react'
import { GetPagesList } from '../getPages'
import { PaneMainTemplate } from '@codelab/frontend/layout'
import { CreatePageButton } from '../createPage'
import { CrudModal, EntityType, ActionType } from '@codelab/frontend/shared'
import { CreatePageForm } from '../createPage'
import { UpdatePageForm } from '../updatePage'
import { DeletePageForm } from '../deletePage'

export const PanePage = () => {
  return (
    <PaneMainTemplate title="Pages" header={<CreatePageButton key={0} />}>
      <GetPagesList />
      <CrudModal
        entityType={EntityType.Page}
        actionType={ActionType.Create}
        okText="Create page"
        renderForm={() => <CreatePageForm />}
      />
      <CrudModal
        entityType={EntityType.Page}
        actionType={ActionType.Update}
        okText="Update page"
        renderForm={() => <UpdatePageForm />}
      />
      <CrudModal
        entityType={EntityType.Page}
        actionType={ActionType.Delete}
        okText="Delete page"
        renderForm={() => <DeletePageForm />}
      />
    </PaneMainTemplate>
  )
}

import { MainPaneTemplate } from '@codelab/frontend/layout'
import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { CreatePageButton, CreatePageForm } from '../createPage'
import { DeletePageForm } from '../deletePage'
import { GetPagesList } from '../getPages'
import { UpdatePageForm } from '../updatePage'

export const PanePage = () => {
  return (
    <MainPaneTemplate title="Pages" header={<CreatePageButton key={0} />}>
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
    </MainPaneTemplate>
  )
}

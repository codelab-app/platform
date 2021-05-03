import { MainPaneTemplate } from '@codelab/frontend/layout'
import { useGetComponentsQuery } from '@codelab/hasura'
import { CreateComponentElementButton } from '@codelab/modules/component-element'
import React from 'react'

export const PaneMainComponentsTree = () => {
  const { data, loading } = useGetComponentsQuery()

  console.log(data)

  return (
    <MainPaneTemplate
      title="Component"
      header={<CreateComponentElementButton key={1} />}
    >
      {/* <CrudModal
        modalProps={{
          className: 'create-component-element-modal',
        }}
        entityType={EntityType.ComponentElement}
        actionType={ActionType.Create}
        okText="Create component element"
        renderForm={() => <CreateComponentElementForm />}
      /> */}
      {/*<CrudModal*/}
      {/*  modalProps={{*/}
      {/*    className: 'update-atom-modal',*/}
      {/*  }}*/}
      {/*  entityType={EntityType.Atom}*/}
      {/*  actionType={ActionType.Update}*/}
      {/*  okText="Update atom"*/}
      {/*  renderForm={() => <UpdateAtomForm />}*/}
      {/*/>*/}
      {/*<CrudModal*/}
      {/*  modalProps={{*/}
      {/*    className: 'delete-atom-modal',*/}
      {/*  }}*/}
      {/*  entityType={EntityType.Atom}*/}
      {/*  actionType={ActionType.Delete}*/}
      {/*  okText="Delete atom"*/}
      {/*  renderForm={() => <DeleteAtomForm />}*/}
      {/*/>*/}
    </MainPaneTemplate>
  )
}

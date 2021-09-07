import { PageType } from '@codelab/frontend/model/state/router'
import {
  CreateElementButton,
  DeleteElementModal,
} from '@codelab/frontend/modules/element'
import {
  CreatePageElementForm,
  PageContext,
  refetchGetPageQuery,
} from '@codelab/frontend/modules/page'
import {
  ActionType,
  CrudModal,
  EntityType,
  useCrudModalForm,
} from '@codelab/frontend/view/components'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { useBuilderSelection } from '../containers/builderState'
import { MainPaneBuilder } from './MainPaneBuilder'

export const MainPaneBuilderPage = () => {
  const { tree, page, loading, pageId } = useContext(PageContext)
  const router = useRouter()
  const { reset } = useCrudModalForm(EntityType.Element)

  const {
    state: { selectedElement },
  } = useBuilderSelection()

  const appId = router.query.appId as string

  return (
    <MainPaneBuilder
      key={pageId}
      tree={tree}
      title={page.name}
      moveElementRefetchQueries={[refetchGetPageQuery({ input: { pageId } })]}
      headerProps={{
        onBack: () =>
          router.push({
            pathname: PageType.PageList,
            query: { appId },
          }),
      }}
      header={<CreateElementButton loading={loading} key={0} />}
    >
      <CrudModal
        entityType={EntityType.Element}
        actionType={ActionType.Create}
        okText={'Create'}
        renderForm={() => (
          <CreatePageElementForm
            initialData={{ parentElementId: selectedElement?.id }}
          />
        )}
      />

      <DeleteElementModal
        formProps={{
          onSubmitSuccess: () => reset(),
          refetchQueries: [refetchGetPageQuery({ input: { pageId: page.id } })],
        }}
      />
    </MainPaneBuilder>
  )
}

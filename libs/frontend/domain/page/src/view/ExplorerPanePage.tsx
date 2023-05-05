import { ExplorerPaneTemplate } from '@codelab/frontend/presentation/view'
import { Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import {
  CreatePageButton,
  CreatePageModal,
  DeletePageModal,
  PageList,
  UpdatePageModal,
} from '../use-cases'

export const ExplorerPanePage = observer(
  ({ loading }: { loading: boolean }) => {
    return (
      <ExplorerPaneTemplate header={<CreatePageButton key={0} />} title="Pages">
        {loading ? <Spin /> : <PageList />}

        <CreatePageModal />
        <UpdatePageModal />
        <DeletePageModal />
      </ExplorerPaneTemplate>
    )
  },
)

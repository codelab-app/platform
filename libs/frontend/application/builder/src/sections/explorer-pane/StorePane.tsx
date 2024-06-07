import type { IStoreModel } from '@codelab/frontend/abstract/domain'
import {
  CreateActionButton,
  CreateActionModal,
} from '@codelab/frontend-application-store/use-cases/create-action'
import { DeleteActionModal } from '@codelab/frontend-application-store/use-cases/delete-action'
import { ActionsTreeView } from '@codelab/frontend-application-store/use-cases/get-actions'
import { StateTreeView } from '@codelab/frontend-application-store/use-cases/get-state'
import { UpdateActionModal } from '@codelab/frontend-application-store/use-cases/update-action'
import { CreateFieldButton } from '@codelab/frontend-application-type/use-cases/create-field'
import { CodeMirrorEditor } from '@codelab/frontend-presentation-components-codemirror'
import { SkeletonWrapper } from '@codelab/frontend-presentation-view/components/skeleton'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import type { Maybe } from '@codelab/shared/abstract/types'
import { Collapse } from 'antd'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren, ReactNode } from 'react'
import React from 'react'

const StoreHeader = ({
  children,
  extra,
}: PropsWithChildren<{ extra?: ReactNode }>) => (
  <div className="flex justify-between">
    <span className="text-sm font-bold">{children}</span>
    <div>{extra}</div>
  </div>
)

export const StorePane = observer<{
  store: Maybe<IStoreModel>
  isLoading: boolean
}>(({ isLoading, store }) => (
  <SkeletonWrapper isLoading={isLoading}>
    {store ? (
      <>
        <Collapse className="mb-2 w-full" defaultActiveKey={['1']} ghost>
          <Collapse.Panel
            header={
              <StoreHeader
                extra={
                  <CreateFieldButton
                    interfaceType={store.api.current}
                    useModal={false}
                  />
                }
              >
                State
              </StoreHeader>
            }
            key="store-state"
          >
            <StateTreeView store={store} />
          </Collapse.Panel>
          <Collapse.Panel
            header={
              <StoreHeader extra={<CreateActionButton />}>Actions</StoreHeader>
            }
            key="store-actions"
          >
            <ActionsTreeView store={store} />
          </Collapse.Panel>
          <Collapse.Panel
            header={<StoreHeader>Inspector</StoreHeader>}
            key="store-inspector"
          >
            <CodeMirrorEditor
              className="mt-1"
              language={CodeMirrorLanguage.Json}
              onChange={() => undefined}
              singleLine={false}
              title="Current props"
              value={store.toString()}
            />
          </Collapse.Panel>
        </Collapse>
        <CreateActionModal store={store} />
        <UpdateActionModal />
        <DeleteActionModal />
      </>
    ) : null}
  </SkeletonWrapper>
))

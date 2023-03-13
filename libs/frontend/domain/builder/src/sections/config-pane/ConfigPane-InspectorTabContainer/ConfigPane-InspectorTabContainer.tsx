import {
  CodeOutlined,
  FileOutlined,
  FormatPainterOutlined,
  FunctionOutlined,
  NodeIndexOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import type {
  IElementTree,
  IPageNodeRef,
  IRenderer,
} from '@codelab/frontend/abstract/core'
import {
  isComponentPageNodeRef,
  isElementPageNodeRef,
} from '@codelab/frontend/abstract/core'
import { isAtomInstance } from '@codelab/frontend/domain/atom'
import { UpdateComponentPropsForm } from '@codelab/frontend/domain/component'
import {
  ElementCssEditor,
  UpdateElementPropsForm,
  UpdateElementPropTransformationForm,
} from '@codelab/frontend/domain/element'
import { UpdatePageTabForm } from '@codelab/frontend/domain/page'
import { useStore } from '@codelab/frontend/presenter/container'
import type { UseTrackLoadingPromises } from '@codelab/frontend/view/components'
import {
  FormContextProvider,
  LoadingIndicator,
  useTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import type { Maybe } from '@codelab/shared/abstract/types'
import { css } from '@emotion/react'
import { Spin, Tabs, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import type { ReactNode } from 'react'
import React from 'react'
import tw from 'twin.macro'
import { PropsInspectorTab } from '../PropsInspectorTab'
import { TabContainer } from './ConfigPane-InspectorTabContainerStyle'
import { TAB_NAMES } from './data'

export interface MetaPaneBuilderProps {
  elementTree: Maybe<IElementTree>
  renderService?: Maybe<IRenderer>
  UpdateElementContent: (props: {
    node: IPageNodeRef
    trackPromises: UseTrackLoadingPromises
  }) => React.ReactElement | null
}

interface TooltipIconProps {
  title: string
  icon: ReactNode
}

const TooltipIcon = ({ icon, title }: TooltipIconProps) => {
  return (
    <Tooltip
      css={css`
        &.anticon {
          ${tw`!mr-0 p-0 h-full flex items-center`}
        }
      `}
      title={title}
    >
      {icon}
    </Tooltip>
  )
}

export const ConfigPaneInspectorTabContainer = observer<MetaPaneBuilderProps>(
  ({ elementTree, renderService, UpdateElementContent }) => {
    const { builderService, elementService, pageService } = useStore()
    const selectedNode = builderService.selectedNode
    const trackPromises = useTrackLoadingPromises()

    if (!selectedNode) {
      return <Spin />
    }

    const autocomplete = renderService?.state
    const allowExpressions = true
    const appStore = renderService?.appStore.current

    const tabItems = [
      {
        children: (
          <UpdateElementContent
            key={selectedNode.id}
            node={selectedNode}
            trackPromises={trackPromises}
          />
        ),
        key: TAB_NAMES.Node,
        label: (
          <TooltipIcon icon={<NodeIndexOutlined />} title={TAB_NAMES.Node} />
        ),
      },
      {
        children: (
          <div key={selectedNode.id}>
            {isElementPageNodeRef(selectedNode) &&
            selectedNode.current.renderType ? (
              <FormContextProvider
                value={{
                  allowExpressions,
                  appStore,
                  autocomplete,
                  elementTree,
                }}
              >
                <UpdateElementPropsForm
                  element={selectedNode}
                  trackPromises={trackPromises}
                />
              </FormContextProvider>
            ) : isComponentPageNodeRef(selectedNode) ? (
              <UpdateComponentPropsForm
                component={selectedNode.current}
                trackPromises={trackPromises}
              />
            ) : (
              `Add an atom or a component to this element to edit its props`
            )}
          </div>
        ),
        key: TAB_NAMES.Props,
        label: (
          <TooltipIcon icon={<SettingOutlined />} title={TAB_NAMES.Props} />
        ),
      },
      {
        children:
          isElementPageNodeRef(selectedNode) &&
          isAtomInstance(selectedNode.current.renderType) ? (
            <ElementCssEditor
              element={selectedNode.current}
              elementService={elementService}
              key={selectedNode.id}
              trackPromises={trackPromises}
            />
          ) : (
            `Add an atom to this page element to edit its CSS`
          ),
        key: TAB_NAMES.CSS,
        label: (
          <TooltipIcon icon={<FormatPainterOutlined />} title={TAB_NAMES.CSS} />
        ),
      },
      {
        children: renderService && (
          <PropsInspectorTab
            key={selectedNode.id}
            node={selectedNode}
            renderer={renderService}
          />
        ),
        key: TAB_NAMES.PropsInspector,
        label: (
          <TooltipIcon
            icon={<CodeOutlined />}
            title={TAB_NAMES.PropsInspector}
          />
        ),
      },
      {
        children: isElementPageNodeRef(selectedNode) ? (
          <UpdateElementPropTransformationForm
            element={selectedNode.current}
            elementService={elementService}
            key={selectedNode.id}
            trackPromises={trackPromises}
          />
        ) : null,
        key: TAB_NAMES.PropsTransformation,
        label: (
          <TooltipIcon
            icon={<FunctionOutlined />}
            title={TAB_NAMES.PropsTransformation}
          />
        ),
      },
      {
        children: (
          <FormContextProvider
            value={{
              allowExpressions,
              appStore,
              autocomplete,
              elementTree,
            }}
          >
            <UpdatePageTabForm
              key={selectedNode.id}
              pageService={pageService}
            />
          </FormContextProvider>
        ),
        key: TAB_NAMES.Page,
        label: <TooltipIcon icon={<FileOutlined />} title={TAB_NAMES.Page} />,
      },
    ]

    return (
      <TabContainer>
        <div css={tw`absolute bottom-0 right-0 m-8`}>
          <LoadingIndicator
            error={trackPromises.error}
            isLoading={trackPromises.isLoading}
          />
        </div>
        <Tabs defaultActiveKey={TAB_NAMES.Node} items={tabItems} size="small" />

        {/* <Tabs.TabPane */}
        {/*  key={selectedNode.id + '_tab4'} */}
        {/*  tab="Hooks" */}
        {/* > */}
        {/*  <ElementHookSection */}
        {/*    atomService={atomService} */}
        {/*    elementId={selectedNode.id} */}
        {/*    key={selectedNode.id} */}
        {/*    typeService={typeService} */}
        {/*  /> */}
        {/* </Tabs.TabPane> */}
      </TabContainer>
    )
  },
)

ConfigPaneInspectorTabContainer.displayName = 'MetaPaneTabContainer'

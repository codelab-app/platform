import {
  CodeOutlined,
  FileOutlined,
  FormatPainterOutlined,
  FunctionOutlined,
  NodeIndexOutlined,
  SettingOutlined,
  SwapOutlined,
} from '@ant-design/icons'
import type {
  IElementTree,
  INode,
  IRenderer,
} from '@codelab/frontend/abstract/core'
import { isComponent, isElement } from '@codelab/frontend/abstract/core'
import { UpdateComponentPropsForm } from '@codelab/frontend/domain/component'
import {
  ElementCssEditor,
  PropMapBindingSection,
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
import { usePropCompletion } from '../../../hooks'
import { PropsInspectorTab } from '../PropsInspectorTab'
import { TabContainer } from './ConfigPane-InspectorTabContainerStyle'
import { TAB_NAMES } from './data'

export interface MetaPaneBuilderProps {
  elementTree: Maybe<IElementTree>
  renderService?: Maybe<IRenderer>
  UpdateElementContent: (props: {
    node: INode
    trackPromises: UseTrackLoadingPromises
  }) => React.ReactElement | null
}

interface TooltipIconProps {
  title: string
  icon: ReactNode
}

const TooltipIcon = ({ title, icon }: TooltipIconProps) => {
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
  ({ UpdateElementContent, elementTree, renderService }) => {
    const { builderService, elementService, pageService } = useStore()
    const selectedNode = builderService.selectedNode
    const { providePropCompletion } = usePropCompletion(renderService)
    const trackPromises = useTrackLoadingPromises()

    if (!selectedNode) {
      return <Spin />
    }

    const autocomplete = renderService?.state
    const allowExpressions = true
    const appStore = renderService?.appStore.current

    const tabItems = [
      {
        key: TAB_NAMES.Node,
        label: (
          <TooltipIcon icon={<NodeIndexOutlined />} title={TAB_NAMES.Node} />
        ),
        children: (
          <UpdateElementContent
            key={selectedNode.id}
            node={selectedNode}
            trackPromises={trackPromises}
          />
        ),
      },
      {
        key: TAB_NAMES.Props,
        label: (
          <TooltipIcon icon={<SettingOutlined />} title={TAB_NAMES.Props} />
        ),
        children: (
          <div key={selectedNode.id}>
            {isElement(selectedNode) &&
            (selectedNode.atom || selectedNode.renderComponentType) ? (
              <FormContextProvider
                value={{
                  autocomplete,
                  appStore,
                  allowExpressions,
                  elementTree,
                }}
              >
                <UpdateElementPropsForm
                  element={selectedNode}
                  trackPromises={trackPromises}
                />
              </FormContextProvider>
            ) : isComponent(selectedNode) ? (
              <UpdateComponentPropsForm
                component={selectedNode}
                trackPromises={trackPromises}
              />
            ) : (
              `Add an atom or a component to this element to edit its props`
            )}
          </div>
        ),
      },
      {
        key: TAB_NAMES.CSS,
        label: (
          <TooltipIcon icon={<FormatPainterOutlined />} title={TAB_NAMES.CSS} />
        ),
        children:
          isElement(selectedNode) && selectedNode.atom ? (
            <ElementCssEditor
              element={selectedNode}
              elementService={elementService}
              key={selectedNode.id}
              trackPromises={trackPromises}
            />
          ) : (
            `Add an atom to this page element to edit its CSS`
          ),
      },
      {
        key: TAB_NAMES.PropsInspector,
        label: (
          <TooltipIcon
            icon={<CodeOutlined />}
            title={TAB_NAMES.PropsInspector}
          />
        ),
        children: renderService && (
          <PropsInspectorTab
            key={selectedNode.id}
            node={selectedNode}
            renderer={renderService}
          />
        ),
      },
      {
        key: TAB_NAMES.PropsMap,
        label: (
          <TooltipIcon icon={<SwapOutlined />} title={TAB_NAMES.PropsMap} />
        ),
        children:
          isElement(selectedNode) && elementTree ? (
            <PropMapBindingSection
              element={selectedNode}
              elementService={elementService}
              elementTree={elementTree}
              key={selectedNode.id}
              providePropCompletion={(searchValue) =>
                providePropCompletion(searchValue, selectedNode.id)
              }
            />
          ) : null,
      },
      {
        key: TAB_NAMES.PropsTransformation,
        label: (
          <TooltipIcon
            icon={<FunctionOutlined />}
            title={TAB_NAMES.PropsTransformation}
          />
        ),
        children: isElement(selectedNode) ? (
          <UpdateElementPropTransformationForm
            element={selectedNode}
            elementService={elementService}
            key={selectedNode.id}
            trackPromises={trackPromises}
          />
        ) : null,
      },
      {
        key: TAB_NAMES.Page,
        label: <TooltipIcon icon={<FileOutlined />} title={TAB_NAMES.Page} />,
        children: (
          <FormContextProvider
            value={{
              autocomplete,
              appStore,
              allowExpressions,
              elementTree,
            }}
          >
            <UpdatePageTabForm
              key={selectedNode.id}
              pageService={pageService}
            />
          </FormContextProvider>
        ),
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

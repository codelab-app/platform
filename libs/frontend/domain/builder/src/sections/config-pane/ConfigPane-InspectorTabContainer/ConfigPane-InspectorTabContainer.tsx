import {
  CodeOutlined,
  FormatPainterOutlined,
  FunctionOutlined,
  NodeIndexOutlined,
  SettingOutlined,
  SwapOutlined,
} from '@ant-design/icons'
import {
  IActionService,
  IAtomService,
  IBuilderService,
  IElementService,
  IElementTree,
  INode,
  IRenderer,
  isElement,
  ITypeService,
  IUserService,
} from '@codelab/frontend/abstract/core'
import {
  ElementCssEditor,
  PropMapBindingSection,
  UpdateElementPropsForm,
  UpdateElementPropTransformationForm,
  UpdateRichTextForm,
} from '@codelab/frontend/domain/element'
import {
  FormContextProvider,
  LoadingIndicator,
  UseTrackLoadingPromises,
  useTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import { css } from '@emotion/react'
import { Tabs, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { ReactNode } from 'react'
import tw from 'twin.macro'
import { usePropCompletion } from '../../../hooks'
import { PropsInspectorTab } from '../PropsInspectorTab'
import { TabContainer } from './ConfigPane-InspectorTabContainerStyle'
import { TAB_NAMES } from './data'

export interface MetaPaneBuilderProps {
  elementTree: IElementTree
  renderService: IRenderer
  UpdateElementContent: (props: {
    node: INode
    trackPromises: UseTrackLoadingPromises
  }) => React.ReactElement | null
  typeService: ITypeService
  atomService: IAtomService
  builderService: IBuilderService
  elementService: IElementService
  actionService: IActionService
  userService: IUserService
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
  ({
    userService,
    UpdateElementContent,
    typeService,
    elementTree,
    builderService,
    renderService,
    elementService,
  }) => {
    const selectedNode = builderService.selectedNode
    const { providePropCompletion } = usePropCompletion(renderService)
    const trackPromises = useTrackLoadingPromises()

    if (!selectedNode) {
      return null
    }

    const autocomplete = renderService.state
    const allowExpressions = true
    const appStore = renderService.appStore.current

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
              <>
                <div css={tw`mb-5`}>
                  <UpdateRichTextForm
                    element={selectedNode}
                    elementService={elementService}
                    trackPromises={trackPromises}
                  />
                </div>
                <FormContextProvider
                  value={{ autocomplete, appStore, allowExpressions }}
                >
                  <UpdateElementPropsForm
                    element={selectedNode}
                    elementService={elementService}
                    trackPromises={trackPromises}
                    typeService={typeService}
                    userService={userService}
                  />
                </FormContextProvider>
              </>
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
        children: isElement(selectedNode) && (
          <PropsInspectorTab
            element={selectedNode}
            elementService={elementService}
            key={selectedNode.id}
            renderer={renderService}
          />
        ),
      },
      {
        key: TAB_NAMES.PropsMap,
        label: (
          <TooltipIcon icon={<SwapOutlined />} title={TAB_NAMES.PropsMap} />
        ),
        children: isElement(selectedNode) ? (
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

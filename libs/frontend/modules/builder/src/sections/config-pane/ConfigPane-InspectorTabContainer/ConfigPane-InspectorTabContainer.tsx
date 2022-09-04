import {
  CodeOutlined,
  FormatPainterOutlined,
  FunctionOutlined,
  NodeIndexOutlined,
  SettingOutlined,
  SwapOutlined,
} from '@ant-design/icons'
import {
  ElementCssEditor,
  PropMapBindingSection,
  UpdateElementPropsForm,
  UpdateElementPropTransformationForm,
  UpdateRichTextForm,
} from '@codelab/frontend/modules/element'
import {
  LoadingIndicator,
  UseTrackLoadingPromises,
  useTrackLoadingPromises,
} from '@codelab/frontend/view/components'
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
} from '@codelab/shared/abstract/core'
import { css } from '@emotion/react'
import { Tabs, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { ReactNode } from 'react'
import tw from 'twin.macro'
import { usePropCompletion } from '../../../hooks'
import { PropsInspectorTab } from '../PropsInspectorTab'
import { TabContainer } from './ConfigPane-InspectorTabContainerStyle'

const FormsGrid = ({ children }: React.PropsWithChildren<unknown>) => (
  <div
    style={{ gridTemplateRows: '1fr auto' }}
    tw="grid grid-cols-2 grid-rows-2 gap-4"
  >
    {children}
  </div>
)

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
    UpdateElementContent,
    elementTree,
    builderService,
    typeService,
    renderService,
    elementService,
    actionService,
    userService,
  }) => {
    const selectedNode = builderService.selectedNode
    const { providePropCompletion } = usePropCompletion(renderService)
    const trackPromises = useTrackLoadingPromises()

    if (!selectedNode) {
      return null
    }

    return (
      <TabContainer>
        <div css={tw`absolute bottom-0 right-0 m-8`}>
          <LoadingIndicator
            error={trackPromises.error}
            isLoading={trackPromises.isLoading}
          />
        </div>

        <Tabs defaultActiveKey="tab1" size="small">
          <Tabs.TabPane
            key="tab1"
            style={{ overflow: 'auto', maxHeight: '100%' }}
            tab={<TooltipIcon icon={<NodeIndexOutlined />} title="Node" />}
          >
            <UpdateElementContent
              key={selectedNode.id}
              node={selectedNode}
              trackPromises={trackPromises}
            />
          </Tabs.TabPane>

          <Tabs.TabPane
            destroyInactiveTabPane
            key="tab2"
            style={{ overflow: 'auto', maxHeight: '100%' }}
            // needed to update props if we change them in the prop inspector tab
            tab={<TooltipIcon icon={<SettingOutlined />} title="Props" />}
          >
            <div key={selectedNode.id}>
              {isElement(selectedNode) &&
              (selectedNode.atom || selectedNode.instanceOfComponent) ? (
                <>
                  <UpdateRichTextForm
                    element={selectedNode}
                    elementService={elementService}
                    trackPromises={trackPromises}
                  />
                  <UpdateElementPropsForm
                    actionList={actionService.actionsList}
                    autocomplete={renderService.platformState}
                    builderState={{
                      componentId: builderService.activeComponent?.id,
                    }}
                    element={selectedNode}
                    elementService={elementService}
                    trackPromises={trackPromises}
                    typeService={typeService}
                    userService={userService}
                  />
                </>
              ) : (
                `Add an atom or a component to this element to edit its props`
              )}
            </div>
          </Tabs.TabPane>

          <Tabs.TabPane
            key="tab3"
            style={{ overflow: 'visible' }}
            tab={<TooltipIcon icon={<FormatPainterOutlined />} title="CSS" />}
          >
            {isElement(selectedNode) && selectedNode.atom ? (
              <ElementCssEditor
                element={selectedNode}
                elementService={elementService}
                key={selectedNode.id}
                trackPromises={trackPromises}
              />
            ) : (
              `Add an atom to this page element to edit its CSS`
            )}
          </Tabs.TabPane>

          {/* <Tabs.TabPane */}
          {/*  key={selectedNode.id + '_tab4'} */}
          {/*  style={{ overflow: 'auto', maxHeight: '100%' }} */}
          {/*  tab="Hooks" */}
          {/* > */}
          {/*  <ElementHookSection */}
          {/*    atomService={atomService} */}
          {/*    elementId={selectedNode.id} */}
          {/*    key={selectedNode.id} */}
          {/*    typeService={typeService} */}
          {/*  /> */}
          {/* </Tabs.TabPane> */}

          <Tabs.TabPane
            key="tab5"
            style={{ overflow: 'auto', maxHeight: '100%' }}
            tab={
              <TooltipIcon icon={<CodeOutlined />} title="Props Inspector" />
            }
          >
            {isElement(selectedNode) && (
              <PropsInspectorTab
                element={selectedNode}
                elementService={elementService}
                key={selectedNode.id}
                renderer={renderService}
              />
            )}
          </Tabs.TabPane>

          <Tabs.TabPane
            key="tab6"
            style={{ overflow: 'auto', maxHeight: '100%' }}
            tab={<TooltipIcon icon={<SwapOutlined />} title="Props Map" />}
          >
            {isElement(selectedNode) ? (
              <PropMapBindingSection
                element={selectedNode}
                elementService={elementService}
                elementTree={elementTree}
                key={selectedNode.id}
                providePropCompletion={(searchValue) =>
                  selectedNode
                    ? providePropCompletion(searchValue, selectedNode.id)
                    : []
                }
              />
            ) : null}
          </Tabs.TabPane>

          <Tabs.TabPane
            key="tab7"
            style={{ overflow: 'auto', maxHeight: '100%' }}
            tab={
              <TooltipIcon
                icon={<FunctionOutlined />}
                title="Props Transformation"
              />
            }
          >
            {isElement(selectedNode) ? (
              <UpdateElementPropTransformationForm
                element={selectedNode}
                elementService={elementService}
                key={selectedNode.id}
                trackPromises={trackPromises}
              />
            ) : null}
          </Tabs.TabPane>
        </Tabs>
      </TabContainer>
    )
  },
)

ConfigPaneInspectorTabContainer.displayName = 'MetaPaneTabContainer'

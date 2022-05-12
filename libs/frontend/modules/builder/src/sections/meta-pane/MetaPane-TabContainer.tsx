import {
  FormatPainterOutlined,
  FunctionOutlined,
  NodeIndexOutlined,
  SettingOutlined,
  SwapOutlined,
} from '@ant-design/icons'
import {
  ATOM_SERVICE,
  BUILDER_SERVICE,
  ELEMENT_SERVICE,
  TYPE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import {
  ElementCssEditor,
  PropMapBindingSection,
  UpdateElementPropsForm,
  UpdateElementPropTransformationForm,
} from '@codelab/frontend/modules/element'
import {
  LoadingIndicator,
  UseTrackLoadingPromises,
  useTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import {
  IComponent,
  IElement,
  IElementTree,
} from '@codelab/shared/abstract/core'
import { css } from '@emotion/react'
import { Tabs, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { ReactNode } from 'react'
import tw from 'twin.macro'
import { usePropCompletion } from '../../hooks'
import { TabContainer } from './MetaPane-TabContainerStyle'

const FormsGrid = ({ children }: React.PropsWithChildren<unknown>) => (
  <div
    style={{ gridTemplateRows: '1fr auto' }}
    tw="grid grid-cols-2 grid-rows-2 gap-4"
  >
    {children}
  </div>
)

export type MetaPaneBuilderProps = {
  elementTree: IElementTree
  renderUpdateElementContent: (
    element: IElement | IComponent,
    trackPromises: UseTrackLoadingPromises,
  ) => React.ReactNode
} & WithServices<
  TYPE_SERVICE | ATOM_SERVICE | BUILDER_SERVICE | ELEMENT_SERVICE
>

type TooltipIconProps = {
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

export const MetaPaneTabContainer = observer<MetaPaneBuilderProps>(
  ({
    renderUpdateElementContent,
    elementTree,
    builderService,
    typeService,
    atomService,
    elementService,
  }) => {
    const selectedElement = builderService.selectedElement
    const { providePropCompletion } = usePropCompletion(builderService)
    const trackPromises = useTrackLoadingPromises()

    if (!selectedElement) {
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

        <Tabs defaultActiveKey={selectedElement.id + '_tab1'} size="small">
          <Tabs.TabPane
            key={selectedElement.id + '_tab1'}
            style={{ overflow: 'auto', maxHeight: '100%' }}
            tab={<TooltipIcon icon={<NodeIndexOutlined />} title="Node" />}
          >
            {renderUpdateElementContent(selectedElement, trackPromises)}
          </Tabs.TabPane>

          <Tabs.TabPane
            destroyInactiveTabPane
            key={selectedElement.id + '_tab2'}
            style={{ overflow: 'auto', maxHeight: '100%' }}
            // needed to update props if we change them in the prop inspector tab
            tab={<TooltipIcon icon={<SettingOutlined />} title="Props" />}
          >
            {selectedElement.atom ? (
              <UpdateElementPropsForm
                autocompleteContext={
                  builderService.builderRenderer.platformState
                }
                element={selectedElement}
                elementService={elementService}
                key={selectedElement.id}
                trackPromises={trackPromises}
                typeService={typeService}
              />
            ) : (
              `Add an atom to this element to edit its props`
            )}
          </Tabs.TabPane>

          <Tabs.TabPane
            key={selectedElement.id + '_tab3'}
            style={{ overflow: 'visible' }}
            tab={<TooltipIcon icon={<FormatPainterOutlined />} title="CSS" />}
          >
            {selectedElement.atom ? (
              <ElementCssEditor
                element={selectedElement}
                elementService={elementService}
                key={selectedElement.id}
                trackPromises={trackPromises}
              />
            ) : (
              `Add an atom to this page element to edit its CSS`
            )}
          </Tabs.TabPane>

          {/* <Tabs.TabPane */}
          {/*  key={selectedElement.id + '_tab4'} */}
          {/*  style={{ overflow: 'auto', maxHeight: '100%' }} */}
          {/*  tab="Hooks" */}
          {/* > */}
          {/*  <ElementHookSection */}
          {/*    atomService={atomService} */}
          {/*    elementId={selectedElement.id} */}
          {/*    key={selectedElement.id} */}
          {/*    typeService={typeService} */}
          {/*  /> */}
          {/* </Tabs.TabPane> */}

          {/* <Tabs.TabPane */}
          {/*  key={selectedElement.id + '_tab5'} */}
          {/*  style={{ overflow: 'auto', maxHeight: '100%' }} */}
          {/*  tab="Props Inspector" */}
          {/* > */}
          {/*  <PropsInspectorTab */}
          {/*    builderService={builderService} */}
          {/*    element={selectedElement} */}
          {/*    elementService={elementService} */}
          {/*    key={selectedElement.id} */}
          {/*  /> */}
          {/* </Tabs.TabPane> */}

          <Tabs.TabPane
            key={selectedElement.id + '_tab6'}
            style={{ overflow: 'auto', maxHeight: '100%' }}
            tab={<TooltipIcon icon={<SwapOutlined />} title="Props Map" />}
          >
            <PropMapBindingSection
              element={selectedElement}
              elementService={elementService}
              elementTree={elementTree}
              key={selectedElement.id}
              providePropCompletion={(searchValue) =>
                selectedElement
                  ? providePropCompletion(searchValue, selectedElement.id)
                  : []
              }
            />
          </Tabs.TabPane>

          <Tabs.TabPane
            key={selectedElement.id + '_tab7'}
            style={{ overflow: 'auto', maxHeight: '100%' }}
            tab={
              <TooltipIcon
                icon={<FunctionOutlined />}
                title="Props Transformation"
              />
            }
          >
            <UpdateElementPropTransformationForm
              element={selectedElement}
              elementService={elementService}
              key={selectedElement.id}
              trackPromises={trackPromises}
            />
          </Tabs.TabPane>
        </Tabs>
      </TabContainer>
    )
  },
)

import CaretRightOutlined from '@ant-design/icons/CaretRightOutlined'
import { ElementStylePseudoClass } from '@codelab/frontend/abstract/application'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { Collapse, ConfigProvider, Select, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { BackgroundEditor } from './background'
import { BorderEditor } from './border'
import { DisplayEditor } from './display'
import { EffectsEditor } from './effects'
import { PositionEditor } from './position'
import { SizeEditor } from './size'
import { SpacingEditor } from './spacing'
import { TypographyEditor } from './typography'

const { Panel } = Collapse
const CONTROL_FONT_SIZE = 12

const panelHeader = (title: string) => {
  return <Typography className="text-[12px] font-semibold">{title}</Typography>
}

export const StylesEditor = observer(() => {
  const className = '[&>*:first-child]:bg-gray-100 [&>*:first-child]:!py-1.5'
  const { runtimeElementService } = useApplicationStore()

  return (
    <ConfigProvider
      theme={{
        components: {
          ColorPicker: {
            fontSize: CONTROL_FONT_SIZE,
          },
          InputNumber: {
            fontSize: CONTROL_FONT_SIZE,
          },
          Select: {
            fontSize: CONTROL_FONT_SIZE,
            optionFontSize: CONTROL_FONT_SIZE,
          },
        },
        token: {
          // motionUnit: 0,
        },
      }}
    >
      <div>Style Selector: </div>
      <Select
        className="mb-2 w-full"
        onSelect={(value) => {
          runtimeElementService.setCurrentStylePseudoClass(value)
        }}
        options={[
          { label: 'None', value: ElementStylePseudoClass.None },
          { label: 'Hover', value: ElementStylePseudoClass.Hover },
          { label: 'Focused', value: ElementStylePseudoClass.Focus },
        ]}
        value={runtimeElementService.currentStylePseudoClass}
      />
      <Collapse
        bordered={false}
        defaultActiveKey={['1', '2', '3', '4', '5', '6', '7', '8']}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        size="small"
      >
        <Panel className={className} header={panelHeader('Layout')} key="1">
          <DisplayEditor />
        </Panel>
        <Panel className={className} header={panelHeader('Spacing')} key="2">
          <SpacingEditor />
        </Panel>
        <Panel className={className} header={panelHeader('Size')} key="3">
          <SizeEditor />
        </Panel>
        <Panel className={className} header={panelHeader('Position')} key="4">
          <PositionEditor />
        </Panel>
        <Panel className={className} header={panelHeader('Typography')} key="5">
          <TypographyEditor />
        </Panel>
        <Panel
          className={className}
          header={panelHeader('Backgrounds')}
          key="6"
        >
          <BackgroundEditor />
        </Panel>
        <Panel className={className} header={panelHeader('Borders')} key="7">
          <BorderEditor />
        </Panel>
        <Panel className={className} header={panelHeader('Effects')} key="8">
          <EffectsEditor />
        </Panel>
      </Collapse>
    </ConfigProvider>
  )
})

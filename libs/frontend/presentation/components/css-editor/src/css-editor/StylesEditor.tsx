import CaretRightOutlined from '@ant-design/icons/CaretRightOutlined'
import { ElementStylePseudoClass } from '@codelab/frontend/abstract/application'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import {
  Collapse,
  type CollapseProps,
  ConfigProvider,
  Select,
  Typography,
} from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { BackgroundEditor } from '../background'
import { BorderEditor } from '../border'
import { DisplayEditor } from '../display'
import { EffectsEditor } from '../effects'
import { PositionEditor } from '../position'
import { SizeEditor } from '../size'
import { SpacingEditor } from '../spacing'
import { TypographyEditor } from '../typography'

const CONTROL_FONT_SIZE = 12

const panelHeader = (title: string) => {
  return <Typography className="text-[12px] font-semibold">{title}</Typography>
}

export const StylesEditor = observer(() => {
  const className = '[&>*:first-child]:bg-gray-100 [&>*:first-child]:!py-1.5'
  const { runtimeElementService } = useApplicationStore()

  const items: CollapseProps['items'] = [
    {
      children: <DisplayEditor />,
      className,
      key: '1',
      label: panelHeader('Layout'),
    },
    {
      children: <SpacingEditor />,
      className,
      key: '2',
      label: panelHeader('Spacing'),
    },
    {
      children: <SizeEditor />,
      className,
      key: '3',
      label: panelHeader('Size'),
    },
    {
      children: <PositionEditor />,
      className,
      key: '4',
      label: panelHeader('Position'),
    },
    {
      children: <TypographyEditor />,
      className,
      key: '5',
      label: panelHeader('Typography'),
    },
    {
      children: <BackgroundEditor />,
      className,
      key: '6',
      label: panelHeader('Backgrounds'),
    },
    {
      children: <BorderEditor />,
      className,
      key: '7',
      label: panelHeader('Borders'),
    },
    {
      children: <EffectsEditor />,
      className,
      key: '8',
      label: panelHeader('Effects'),
    },
  ]

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
        items={items}
        size="small"
      ></Collapse>
    </ConfigProvider>
  )
})

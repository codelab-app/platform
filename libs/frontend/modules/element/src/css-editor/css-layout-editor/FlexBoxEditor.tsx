import { DownOutlined } from '@ant-design/icons'
import { cssMap, IElement } from '@codelab/shared/abstract/core'
import { Button, Dropdown, InputNumber, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { makeMenu } from '../utils/makeMenu'
import { updateGuiCssProperty } from '../utils/updateGuiCssProperty'

type FlexBoxEditorProps = {
  element: IElement
}

export const FlexBoxEditor = observer(({ element }: FlexBoxEditorProps) => {
  const [guiCssObj, setGuiCssObj] = useState<cssMap>(
    JSON.parse(element.guiCss ?? '{}'),
  )

  useEffect(() => {
    setGuiCssObj(JSON.parse(element.guiCss ?? '{}'))
  }, [element.guiCss])

  const flexDirectionMenu = makeMenu(
    ['none', 'row', 'row-reverse', 'column', 'column-reverse'],
    (val) => {
      if (val === 'none') {
        element.deleteFromGuiCss(['display'])
      } else {
        element.appendToGuiCss({
          display: 'flex',
        })
      }

      updateGuiCssProperty(element, 'flex-direction')(val)
    },
  )

  const alignItemsMenu = makeMenu(
    ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
    updateGuiCssProperty(element, 'align-items'),
  )

  const justifyContentMenu = makeMenu(
    ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'],
    updateGuiCssProperty(element, 'justify-content'),
  )

  const flexWrapMenu = makeMenu(
    ['nowrap', 'wrap', 'wrap-reverse'],
    updateGuiCssProperty(element, 'flex-wrap'),
  )

  return (
    <>
      <Dropdown overlay={flexDirectionMenu}>
        <Button>
          <Space>
            flex-direction: <span>{guiCssObj['flex-direction'] ?? 'none'}</span>
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <Dropdown overlay={alignItemsMenu}>
        <Button>
          <Space>
            align-items: <span>{guiCssObj['align-items'] ?? 'none'}</span>
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <Dropdown overlay={justifyContentMenu}>
        <Button>
          <Space>
            justify-content:{' '}
            <span>{guiCssObj['justify-content'] ?? 'none'}</span>
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <Dropdown overlay={flexWrapMenu}>
        <Button>
          <Space>
            flex-wrap: <span>{guiCssObj['flex-wrap'] ?? 'none'}</span>
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <Space>
        <span>flex-grow: </span>
        <InputNumber
          defaultValue={parseFloat(guiCssObj['flex-grow'] ?? '0')}
          max={1}
          min={0}
          onChange={(val) =>
            updateGuiCssProperty(element, 'flex-grow')(`${val}`)
          }
          step={0.1}
        />
      </Space>
    </>
  )
})

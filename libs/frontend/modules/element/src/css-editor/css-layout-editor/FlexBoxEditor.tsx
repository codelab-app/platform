import { DownOutlined } from '@ant-design/icons'
import { cssMap, IElement } from '@codelab/shared/abstract/core'
import { Button, Dropdown, InputNumber, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { makeMenu, updateGuiCssProperty } from '../utils'

type DisplayEditorProps = {
  element: IElement
  guiCssObj: cssMap
}

export const FlexBoxEditor = observer(
  ({ element, guiCssObj }: DisplayEditorProps) => {
    const displayMenu = makeMenu(
      ['block', 'flex'],
      updateGuiCssProperty(element, 'display'),
    )

    const flexDirectionMenu = makeMenu(
      ['none', 'row', 'row-reverse', 'column', 'column-reverse'],
      updateGuiCssProperty(element, 'flex-direction'),
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
        <Dropdown overlay={displayMenu}>
          <Button>
            <Space>
              display: <span>{guiCssObj['display'] ?? 'none'}</span>
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        {guiCssObj['display'] !== 'flex' ? null : (
          <>
            <Dropdown overlay={flexDirectionMenu}>
              <Button>
                <Space>
                  flex-direction:{' '}
                  <span>{guiCssObj['flex-direction'] ?? 'none'}</span>
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
        )}
      </>
    )
  },
)

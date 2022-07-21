import { DownOutlined } from '@ant-design/icons'
import { cssMap, IElement } from '@codelab/shared/abstract/core'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { Button, Col, Dropdown, InputNumber, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { makeMenu, updateGuiCssProperty } from '../utils'

type DisplayEditorProps = {
  element: IElement
  guiCssObj: cssMap
}

const props = [
  {
    name: 'display',
    options: ['block', 'flex'],
  },
  {
    name: 'flex-direction',
    options: ['row', 'row-reverse', 'column', 'column-reverse'],
  },
  {
    name: 'flex-wrap',
    options: ['nowrap', 'wrap', 'wrap-reverse'],
  },
  {
    name: 'justify-content',
    options: [
      'flex-start',
      'flex-end',
      'center',
      'space-between',
      'space-around',
      'space-evenly',
    ],
  },
  {
    name: 'align-items',
    options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
  },
]

type OverlayMenusType = {
  [name: string]: EmotionJSX.Element
}

export const FlexBoxEditor = observer(
  ({ element, guiCssObj }: DisplayEditorProps) => {
    const [overlayMenus, setOverlayMenus] = useState<OverlayMenusType>({})

    useEffect(() => {
      const overlayMenusUpdated = props.reduce(
        (acc, prop) => ({
          ...acc,
          [prop.name]: makeMenu(
            prop.options,
            updateGuiCssProperty(element, prop.name),
          ),
        }),
        {},
      )

      setOverlayMenus(overlayMenusUpdated)
    }, [element, overlayMenus])

    return (
      <>
        <Row>
          <Col span={8}>display</Col>
          <Col span={16}>
            <Dropdown overlay={overlayMenus['display']}>
              <Button style={{ width: '100%' }}>
                <span style={{ width: '90%' }}>
                  {guiCssObj['display'] ?? 'none'}
                </span>
                <DownOutlined style={{ width: '10%' }} />
              </Button>
            </Dropdown>
          </Col>
        </Row>
        {guiCssObj['display'] !== 'flex' ? null : (
          <>
            {props
              .filter((prop) => prop.name !== 'display')
              .map(({ name }) => (
                <Row>
                  <Col span={8}>{name}:</Col>
                  <Col span={16}>
                    <Dropdown overlay={overlayMenus[name]}>
                      <Button style={{ width: '100%' }}>
                        <span style={{ width: '90%' }}>
                          {guiCssObj[name] ?? 'none'}
                        </span>
                        <DownOutlined style={{ width: '10%' }} />
                      </Button>
                    </Dropdown>
                  </Col>
                </Row>
              ))}
            <Row>
              <Col span={8}>flex-grow:</Col>
              <Col span={16}>
                <InputNumber
                  defaultValue={parseFloat(guiCssObj['flex-grow'] ?? '0')}
                  max={1}
                  min={0}
                  onChange={(val) =>
                    updateGuiCssProperty(element, 'flex-grow')(`${val}`)
                  }
                  step={0.1}
                  style={{ width: '100%' }}
                />
              </Col>
            </Row>
          </>
        )}
      </>
    )
  },
)

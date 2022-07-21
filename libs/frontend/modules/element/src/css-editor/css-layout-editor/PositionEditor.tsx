import { DownOutlined } from '@ant-design/icons'
import { cssMap, IElement } from '@codelab/shared/abstract/core'
import { Button, Col, Dropdown, InputNumber, Row, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useState } from 'react'
import { makeAddonAfterNumber, makeMenu, updateGuiCssProperty } from '../utils'

type PositionEditorProps = {
  element: IElement
  guiCssObj: cssMap
}

type optUnitMap = {
  [key: string]: {
    unit: string
    value: number
  }
}

const matchNumber = new RegExp(/[0-9]+\.?([0-9]+)?/)
const matchUnit = new RegExp(/[a-z]+|%/)
const defaultUnits = ['auto', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw']

const options = [
  {
    name: 'top',
    units: defaultUnits,
  },
  {
    name: 'right',
    units: defaultUnits,
  },
  {
    name: 'bottom',
    units: defaultUnits,
  },
  {
    name: 'left',
    units: defaultUnits,
  },
  {
    name: 'zIndex',
    units: ['auto', ' '],
  },
]

export const PositionEditor = observer(
  ({ element, guiCssObj }: PositionEditorProps) => {
    const [optValue, setOptValue] = useState<optUnitMap>(
      options.reduce(
        (acc, opt) => ({
          ...acc,
          [opt.name]: {
            unit: matchUnit.exec(guiCssObj[opt.name] ?? '')?.[0] ?? 'auto',
            value: matchNumber.exec(guiCssObj[opt.name] ?? '')?.[0] ?? 0,
          },
        }),
        {},
      ),
    )

    useEffect(() => {
      options.forEach((option) => {
        updateGuiCssProperty(
          element,
          option.name,
        )(
          `${
            optValue[option.name].unit !== 'auto'
              ? optValue[option.name].value
              : ''
          }${optValue[option.name].unit}`,
        )
      })
    }, [element, optValue])

    const selectAfter = useCallback(
      (optionName: string, selectedUnit: string) =>
        makeAddonAfterNumber(
          options
            .find((opt) => opt.name === optionName)
            ?.units.map((unit) => ({
              value: unit,
              title: unit,
            })) ?? [],
          selectedUnit,
          (val) =>
            setOptValue({
              ...optValue,
              [optionName]: {
                ...optValue[optionName],
                unit: val,
              },
            }),
        ),
      [optValue],
    )

    const positionMenu = makeMenu(
      ['static', 'relative', 'fixed', 'absolute', 'sticky'],
      updateGuiCssProperty(element, 'position'),
    )

    return (
      <Space>
        <Row gutter={[32, 24]}>
          <Col>
            <Dropdown overlay={positionMenu}>
              <Button>
                <Space>
                  position: <span>{guiCssObj['position'] ?? 'static'}</span>
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Col>
          {!guiCssObj['position'] ||
          guiCssObj['position'] === 'static' ? null : (
            <>
              {options.map((option, i) => (
                <Col>
                  <Row>
                    <Col span={6}>
                      <span>{option.name}: </span>
                    </Col>
                    <Col span={18}>
                      <InputNumber
                        addonAfter={selectAfter(
                          option.name,
                          optValue[option.name].unit,
                        )}
                        defaultValue={optValue[option.name].value}
                        disabled={optValue[option.name].unit === 'auto'}
                        onChange={(val) => {
                          setOptValue({
                            ...optValue,
                            [option.name]: {
                              ...optValue[option.name],
                              value: val,
                            },
                          })
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
              ))}
            </>
          )}
        </Row>
      </Space>
    )
  },
)

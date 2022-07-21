import { cssMap, IElement } from '@codelab/shared/abstract/core'
import { Col, InputNumber, Row, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useState } from 'react'
import { makeAddonAfterNumber, updateGuiCssProperty } from '../utils'

type PaddingEditorProps = {
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

const options = [
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
]

const units = ['px', '%', 'em', 'rem', 'ch', 'vh', 'vw']

export const PaddingEditor = observer(
  ({ element, guiCssObj }: PaddingEditorProps) => {
    const [optValue, setOptValue] = useState<optUnitMap>(
      options.reduce(
        (acc, opt) => ({
          ...acc,
          [opt]: {
            unit: matchUnit.exec(guiCssObj[opt] ?? '')?.[0] ?? 'px',
            value: matchNumber.exec(guiCssObj[opt] ?? '')?.[0] ?? 0,
          },
        }),
        {},
      ),
    )

    useEffect(() => {
      options.forEach((option) => {
        updateGuiCssProperty(
          element,
          option,
        )(`${optValue[option].value}${optValue[option].unit}`)
      })
    }, [element, optValue])

    const selectAfter = useCallback(
      (option: string, selectedUnit: string) =>
        makeAddonAfterNumber(
          units.map((unit) => ({
            value: unit,
            title: unit,
          })),
          selectedUnit,
          (val) =>
            setOptValue({
              ...optValue,
              [option]: {
                ...optValue[option],
                unit: val,
              },
            }),
        ),
      [optValue],
    )

    return (
      <Space>
        <Row gutter={[32, 24]}>
          {options.map((option, i) => (
            <Col>
              <Row>
                <Col span={6}>
                  <span>{option}: </span>
                </Col>
                <Col span={18}>
                  <InputNumber
                    addonAfter={selectAfter(option, optValue[option].unit)}
                    defaultValue={optValue[option].value}
                    onChange={(val) => {
                      setOptValue({
                        ...optValue,
                        [option]: {
                          ...optValue[option],
                          value: val,
                        },
                      })
                    }}
                  />
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </Space>
    )
  },
)

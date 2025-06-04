'use client'

import type { IElementModel } from '@codelab/frontend-abstract-domain'
import type { IElementDto, IRef } from '@codelab/shared-abstract-core'
import type { GuaranteedProps } from 'uniforms'

import CodeSandboxOutlined from '@ant-design/icons/CodeSandboxOutlined'
import DeploymentUnitOutlined from '@ant-design/icons/DeploymentUnitOutlined'
import { Button, Form, Select } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import { connectField } from 'uniforms'

import {
  useLoadOptions,
  useRenderTypeSelectOptions,
} from './useRenderType.hook'

type RenderTypeProps = GuaranteedProps<Partial<IElementDto['renderType']>> & {
  parentElement?: IElementModel
  parentComponent?: IRef
}

const BUTTON_WIDTH = 40

const StyledSelect = styled(Select)`
  width: calc(100% - ${BUTTON_WIDTH * 2}px) !important;

  .ant-select-selector {
    border-right: 0 !important;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`

const StyledButton = styled(Button)`
  padding: 4px 12px;
`

const StyledFormField = styled(Form.Item)`
  .ant-form-item-control-input-content {
    display: flex;
  }
`

export const RenderTypeField = connectField(
  ({
    error,
    id,
    label,
    onChange,
    parentComponent,
    parentElement,
    value,
  }: RenderTypeProps) => {
    const [menuState, setMenuState] = useState({
      open: false,
      skipClose: false,
    })

    const [filters, setFilters] = useState({ atoms: true, components: true })

    const { atoms, components } = useLoadOptions({
      parentComponent,
      parentElement,
    })

    const componentsToShow = filters.components ? components : []
    const atomsToShow = filters.atoms ? atoms : []
    const options = useRenderTypeSelectOptions(componentsToShow, atomsToShow)

    return (
      <StyledFormField
        extra={error}
        htmlFor={id}
        label={label}
        required={true}
        validateStatus={error ? 'error' : undefined}
      >
        <StyledSelect
          getPopupContainer={(triggerNode) => triggerNode.closest('form')}
          id={id}
          onChange={(newId) => {
            const option = options.find(
              ({ value: optionValue }) => optionValue === newId,
            )

            const __typename = option?.__typename

            onChange({ __typename, id: newId as string })
          }}
          onOpenChange={(open) => {
            !menuState.skipClose && setMenuState({ ...menuState, open })
          }}
          open={menuState.open}
          optionFilterProp="text"
          optionRender={(option) => (
            // eslint-disable-next-line tailwindcss/no-custom-classname
            <div className="ant-select-item-option" title={option.data.text}>
              {option.label}
            </div>
          )}
          options={options}
          placement="bottomRight"
          showSearch
          style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
          styles={{ popup: { root: { width: '100%' } } }}
          value={value?.id}
        />
        <StyledButton
          onClick={() => {
            filters.atoms &&
              setFilters({ ...filters, components: !filters.components })
            setMenuState({ ...menuState, open: true })
          }}
          onMouseEnter={() => setMenuState({ ...menuState, skipClose: true })}
          onMouseLeave={() => setMenuState({ ...menuState, skipClose: false })}
          style={{ borderRadius: 0 }}
          type={filters.components ? 'primary' : 'default'}
        >
          <CodeSandboxOutlined />
        </StyledButton>
        <StyledButton
          onClick={() => {
            filters.components &&
              setFilters({ ...filters, atoms: !filters.atoms })
            setMenuState({ ...menuState, open: true })
          }}
          onMouseEnter={() => setMenuState({ ...menuState, skipClose: true })}
          onMouseLeave={() => setMenuState({ ...menuState, skipClose: false })}
          style={{
            borderBottomLeftRadius: 0,
            borderLeft: 0,
            borderTopLeftRadius: 0,
          }}
          type={filters.atoms ? 'primary' : 'default'}
        >
          <DeploymentUnitOutlined />
        </StyledButton>
      </StyledFormField>
    )
  },
)

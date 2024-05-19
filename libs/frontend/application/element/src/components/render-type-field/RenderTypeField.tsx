import CodeSandboxOutlined from '@ant-design/icons/CodeSandboxOutlined'
import DeploymentUnitOutlined from '@ant-design/icons/DeploymentUnitOutlined'
import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import type { IElementDto } from '@codelab/shared/abstract/core'
import { Button, Form, Select } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import type { GuaranteedProps } from 'uniforms'
import { connectField } from 'uniforms'
import {
  useLoadOptions,
  useRenderTypeSelectOptions,
} from './RenderTypeFieldHooks'

type RenderTypeProps = GuaranteedProps<Partial<IElementDto['renderType']>> & {
  parentAtom?: IAtomModel
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

export const RenderTypeField = connectField((props: RenderTypeProps) => {
  const { error, id, label, onChange, parentAtom } = props
  const [menuOpened, setMenuOpened] = useState(false)
  const [skipMenuClose, setSkipMenuClose] = useState(false)
  const [showComponents, setShowComponents] = useState(true)
  const [showAtoms, setShowAtoms] = useState(true)
  const { atoms, components, loadOptionsIfNeeded } = useLoadOptions(parentAtom)
  const errorMessage = error?.message || components.error || atoms.error
  const componentsToShow = showComponents ? components.result : []
  const atomsToShow = showAtoms ? atoms.result : []
  const options = useRenderTypeSelectOptions(componentsToShow, atomsToShow)

  return (
    <Form.Item
      help={errorMessage}
      htmlFor={id}
      label={label}
      required={true}
      validateStatus={errorMessage ? 'error' : undefined}
    >
      <StyledSelect
        dropdownStyle={{ width: '100%' }}
        getPopupContainer={(triggerNode) => triggerNode.closest('form')}
        id={id}
        loading={components.status === 'loading' || atoms.status === 'loading'}
        onChange={(newId) => {
          const option = options.find(({ value }) => value === newId)
          const __typename = option?.__typename

          onChange({ __typename, id: newId as string })
        }}
        onDropdownVisibleChange={(open) => {
          !skipMenuClose && setMenuOpened(open)
          loadOptionsIfNeeded()
        }}
        open={menuOpened}
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
        value={props.value?.id}
      />

      <StyledButton
        onClick={() => {
          showAtoms && setShowComponents(!showComponents)
          setMenuOpened(true)
          loadOptionsIfNeeded()
        }}
        onMouseEnter={() => setSkipMenuClose(true)}
        onMouseLeave={() => setSkipMenuClose(false)}
        style={{ borderRadius: 0 }}
        type={showComponents ? 'primary' : 'default'}
      >
        <CodeSandboxOutlined />
      </StyledButton>
      <StyledButton
        onClick={() => {
          showComponents && setShowAtoms(!showAtoms)
          setMenuOpened(true)
          loadOptionsIfNeeded()
        }}
        onMouseEnter={() => setSkipMenuClose(true)}
        onMouseLeave={() => setSkipMenuClose(false)}
        style={{
          borderBottomLeftRadius: 0,
          borderLeft: 0,
          borderTopLeftRadius: 0,
        }}
        type={showAtoms ? 'primary' : 'default'}
      >
        <DeploymentUnitOutlined />
      </StyledButton>
    </Form.Item>
  )
})

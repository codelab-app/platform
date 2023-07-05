import type { formController } from '@codelab/frontend/abstract/types'
import styled from 'styled-components'
import { Button } from 'antd'
import React from 'react'

const StyledContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .ant-btn {
    min-width: 48%;
  }
`

const formControl = ({ onCancel, submitLabel }: formController) => {
  return (
    <StyledContainer>
      <Button htmlType="submit" type="primary">
        {submitLabel}
      </Button>
      <Button onClick={onCancel} type="default">
        Cancel
      </Button>
    </StyledContainer>
  )
}

export const FormController = formControl

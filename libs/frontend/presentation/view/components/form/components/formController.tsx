import type { formController } from '@codelab/frontend/abstract/types'
import styled from '@emotion/styled'
import { Button } from 'antd'
import React from 'react'

const StyledContainer = styled.div`
  width: 100%;
  padding: 10px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .ant-btn {
    width: 45%;
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

import type { formController } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .ant-btn {
    min-width: 48%;
    flex: 1;
  }
  .ant-btn:not(:last-child) {
    margin-right: 20px; /* Adjust this value to set the amount of space between items */
  }
`

const formControl = ({ onCancel, submitLabel }: formController) => {
  return (
    <StyledContainer>
      <Button htmlType="submit" type="primary">
        {submitLabel}
      </Button>
      {onCancel && (
        <Button onClick={onCancel} type="default">
          Cancel
        </Button>
      )}
    </StyledContainer>
  )
}

export const FormController = formControl

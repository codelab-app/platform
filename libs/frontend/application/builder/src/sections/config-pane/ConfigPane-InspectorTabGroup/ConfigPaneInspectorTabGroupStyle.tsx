import { CuiTestId } from '@codelab/frontend-application-shared-data'
import classNames from 'classnames'
import styled from 'styled-components'

export const TabGroup = styled.div.attrs({
  className: classNames(
    '[&_.ant-tabs]:px-4',
    '[&_.ant-tabs]:mb-0',
    '[&_.ant-tabs_.antd-tabs]:px-0',
  ),
  'data-testid': CuiTestId.cuiConfigPane(),
})``

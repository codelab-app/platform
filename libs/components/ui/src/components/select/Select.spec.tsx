import { render, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { get } from 'lodash'
import {
  ReactNodeI,
  ReactNodeTypeEnum,
  NodeTypeEnum,
} from '@codelab/shared/interface/node'
import { cLog } from '@codelab/shared/utils'
import { Default } from './Select.stories'
import { Form } from '../form/Form.types'

describe('Select', () => {
  it('should render with text', async () => {
    const { getByText } = render(<Default />)

    expect(getByText('A')).toBeTruthy()

    fireEvent.mouseDown(getByText('A').parentElement)

    await waitFor(() => expect(getByText('B')).toBeInTheDocument())
    await waitFor(() => expect(getByText('C')).toBeInTheDocument())
  })

  it('should generate option input data with an array of enum types', () => {
    enum Coins {
      BTC = 'btc',
      ETH = 'eth',
    }
    const options = Form.createOptions<string>(Object.entries(Coins))

    cLog(options)

    expect(get(options, '0.props.value')).toBe('btc')
    expect(get(options, '0.children.0.props.value')).toBe('BTC')

    expect(get(options, '1.props.value')).toBe('eth')
    expect(get(options, '1.children.0.props.value')).toBe('ETH')
  })
})

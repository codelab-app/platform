import { fireEvent, render, waitFor } from '@testing-library/react'
import { get } from 'lodash'
import React from 'react'
import { CodelabForm } from '../form'
import { Default } from './Select.stories'
import { cLog } from '@codelab/shared/utils'

describe('Select', () => {
  it('should render with text', async () => {
    const { getByText } = render(<Default />)

    expect(getByText('A')).toBeTruthy()

    const elem = getByText('A').parentElement

    if (!elem) {
      throw new Error('missing elem')
    }

    fireEvent.mouseDown(elem)

    await waitFor(() => expect(getByText('B')).toBeInTheDocument())
    await waitFor(() => expect(getByText('C')).toBeInTheDocument())
  })

  it('should generate option input data with an array of enum types', () => {
    enum Coins {
      BTC = 'btc',
      ETH = 'eth',
    }
    const options = CodelabForm.createOptions(Object.entries(Coins))

    cLog(options)

    expect(get(options, '0.props.value')).toBe('btc')
    expect(get(options, '0.children.0.props.value')).toBe('BTC')

    expect(get(options, '1.props.value')).toBe('eth')
    expect(get(options, '1.children.0.props.value')).toBe('ETH')
  })
})

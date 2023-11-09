import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { InterfaceForm } from '../../InterfaceForm'
import { interfaceWithEnumField } from '../setup-store'

describe('InterfaceForm', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn().mockImplementation((query) => ({
        addEventListener: jest.fn(),
        addListener: jest.fn(),
        dispatchEvent: jest.fn(),
        matches: false,
        media: query,
        onchange: null,
        removeEventListener: jest.fn(),
        removeListener: jest.fn(),
      })),
      writable: true,
    })
  })

  test('interface form select enum field value', async () => {
    const { container } = render(
      <InterfaceForm
        interfaceType={interfaceWithEnumField}
        model={{}}
        onSubmit={async (data) => {
          console.log('submited', data)
        }}
        submitField={React.Fragment}
      />,
    )

    // Check enumField is rendered
    expect(container.querySelector('[name="enumField"]')).toBeInTheDocument()

    // Check enumField has the correct initial value
    const selectedItem = container.querySelector(
      '.ant-select-selection-item[title="Enum 1"]',
    )

    expect(selectedItem).toBeInTheDocument()
    expect(selectedItem).toHaveTextContent('Enum 1')

    // Click on the dropdown
    await act(() => userEvent.click(screen.getByLabelText('Enum field')))

    // Select the second option
    const dropdownOption = screen.getByRole('option', { name: 'Enum 2' })

    await act(() => userEvent.click(dropdownOption))
  })
})

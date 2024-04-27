import { act, render, screen } from '@testing-library/react'
import React from 'react'
import { TextEditor } from './TextEditor'

describe('TextEditor', () => {
  it('renders initial data correctly', async () => {
    const initialData = 'Hello, world!'

    await act(async () => {
      render(
        <TextEditor
          config={{ editable: false }}
          onChange={() => {}}
          value={initialData}
        />,
      )
    })

    screen.debug()

    // Assuming the TextEditor component uses ContentEditable internally
    // and that it renders the HTML inside it.
    const contentEditable = screen.getByRole('textbox')

    expect(contentEditable).toContainHTML(initialData)
  })
})

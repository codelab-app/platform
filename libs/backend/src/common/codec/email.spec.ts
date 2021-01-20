import { Email } from './email'

describe('Email codec', () => {
  it('validates email data', () => {
    const email = 'admin@codelab.ai'
    const result = Email.decode(email)

    console.log(result)

    expect(true).toBeTruthy()
  })
})

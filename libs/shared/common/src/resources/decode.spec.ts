import * as t from 'io-ts'
import { DecodeError } from '../errors'
import { decode } from './decode'

describe('Codec decode helper', () => {
  interface Todo {
    title: string
  }

  const todoC: t.Type<Todo> = t.type({
    title: t.string,
  })

  it('decodes a valid input', () => {
    const input = {
      title: 'Watch tutorial',
    }
    const { data } = decode(input, todoC)

    expect(data).toEqual(input)
  })

  it('throws an error for an invalid input', () => {
    const input = {
      name: 'Watch tutorial',
    }
    const decodeIncorrectInput = () => decode(input, todoC)

    expect(decodeIncorrectInput).toThrow(DecodeError)
  })
})

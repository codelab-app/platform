import { act, renderHook } from '@testing-library/react'
import { useToggleState } from './toggle'

describe('useToggleState', () => {
  it('should initialize with closed state', () => {
    const { result } = renderHook(() => useToggleState())

    expect(result.current.isOpen).toBe(false)
    expect(result.current.data).toBeUndefined()
  })

  it('should open with data', () => {
    const { result } = renderHook(() => useToggleState<string>())

    act(() => {
      result.current.open('test data')
    })

    expect(result.current.isOpen).toBe(true)
    expect(result.current.data).toBe('test data')
  })

  it('should open without data', () => {
    const { result } = renderHook(() => useToggleState())

    act(() => {
      result.current.open()
    })

    expect(result.current.isOpen).toBe(true)
    expect(result.current.data).toBeUndefined()
  })

  it('should close and clear data', () => {
    const { result } = renderHook(() => useToggleState<string>())

    act(() => {
      result.current.open('test data')
    })

    act(() => {
      result.current.close()
    })

    expect(result.current.isOpen).toBe(false)
    expect(result.current.data).toBeUndefined()
  })

  it('should update data when reopening', () => {
    const { result } = renderHook(() => useToggleState<string>())

    act(() => {
      result.current.open('initial data')
    })

    act(() => {
      result.current.open('updated data')
    })

    expect(result.current.isOpen).toBe(true)
    expect(result.current.data).toBe('updated data')
  })

  it('should transform input data using mapper function', () => {
    const mapper = (input: string) => {
      const [firstname, lastname] = input.split(' ')

      return { firstname: firstname!, lastname: lastname! }
    }

    const { result } = renderHook(() =>
      useToggleState<string, { firstname: string; lastname: string }>(mapper),
    )

    act(() => {
      result.current.open('John Doe')
    })

    expect(result.current.isOpen).toBe(true)
    expect(result.current.data).toEqual({ firstname: 'John', lastname: 'Doe' })
  })
})

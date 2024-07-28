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
})

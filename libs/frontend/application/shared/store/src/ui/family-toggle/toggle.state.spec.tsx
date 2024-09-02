import { UiKey } from '@codelab/frontend/abstract/types'
import { act, renderHook } from '@testing-library/react'
import { useToggleState } from './toggle.state'

describe('useToggleState', () => {
  const key = UiKey.CreateAppForm
  const useCreateAppForm = () => useToggleState<string>(key)

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCreateAppForm())

    expect(result.current.isOpen).toBeFalsy()
    expect(result.current.data).toBeUndefined()
  })

  it('should open with provided data', () => {
    const { result } = renderHook(() => useCreateAppForm())

    act(() => {
      result.current.open('test data')
    })

    expect(result.current.isOpen).toBeTruthy()
    expect(result.current.data).toBe('test data')
  })

  it('should close and reset data', () => {
    const { result } = renderHook(() => useCreateAppForm())

    act(() => {
      result.current.open('test data')
    })

    act(() => {
      result.current.close()
    })

    expect(result.current.isOpen).toBeFalsy()
    expect(result.current.data).toBeUndefined()
  })

  it('should use mapper function when provided', () => {
    const mapper = (data?: string) => ({ mappedData: data?.toUpperCase() })

    const { result } = renderHook(() =>
      useToggleState<string, { mappedData: string | undefined }>(key, mapper),
    )

    act(() => {
      result.current.open('test data')
    })

    expect(result.current.isOpen).toBeTruthy()
    expect(result.current.data).toEqual({ mappedData: 'TEST DATA' })
  })
})
